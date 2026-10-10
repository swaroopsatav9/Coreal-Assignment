import re
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Solution, Industry, Property, PartnerInquiry, PartnerProfile, NetworkMetric, FAQItem

class SolutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Solution
        fields = '__all__'

class IndustrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Industry
        fields = '__all__'

class PropertySerializer(serializers.ModelSerializer):
    solution_name = serializers.CharField(source='solution.name', read_only=True)
    
    class Meta:
        model = Property
        fields = '__all__'

class PartnerInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = PartnerInquiry
        fields = '__all__'
        read_only_fields = ('created_at', 'status')

    def validate_full_name(self, value):
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Full name must be at least 2 characters long.")
        return value.strip()

    def validate_phone(self, value):
        cleaned_phone = re.sub(r'[\s\-\+]', '', value)
        if cleaned_phone.startswith('91') and len(cleaned_phone) == 12:
            cleaned_phone = cleaned_phone[2:]
        if not re.match(r'^[6-9]\d{9}$', cleaned_phone):
            raise serializers.ValidationError("Enter a valid 10-digit Indian mobile number.")
        return cleaned_phone

    def validate_target_pincode(self, value):
        if value:
            cleaned = re.sub(r'\D', '', value)
            if len(cleaned) != 6:
                raise serializers.ValidationError("Enter a valid 6-digit Indian PIN code.")
            return cleaned
        return value

class NetworkMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = NetworkMetric
        fields = '__all__'

class FAQItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQItem
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    role = serializers.CharField(source='partner_profile.role', read_only=True)
    company_name = serializers.CharField(source='partner_profile.company_name', read_only=True)
    phone = serializers.CharField(source='partner_profile.phone', read_only=True)
    kyc_status = serializers.CharField(source='partner_profile.kyc_status', read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'role', 'company_name', 'phone', 'kyc_status')

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if username and password:
            user = authenticate(username=username, password=password)
            if not user:
                raise serializers.ValidationError("Invalid credentials. Please verify your username and password.")
            if not user.is_active:
                raise serializers.ValidationError("Account is inactive. Please contact support.")
            data['user'] = user
            return data
        raise serializers.ValidationError("Must provide both username and password.")

class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(min_length=3)
    email = serializers.EmailField()
    password = serializers.CharField(min_length=6, write_only=True)
    full_name = serializers.CharField(required=False, default='')
    phone = serializers.CharField(required=False, default='')
    company_name = serializers.CharField(required=False, default='')
    role = serializers.ChoiceField(
        choices=['associate_partner', 'associate_customer'],
        default='associate_partner'
    )

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("A user with this username already exists.")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email address already exists.")
        return value

    def create(self, validated_data):
        full_name = validated_data.get('full_name', '')
        first_name = full_name.split()[0] if full_name else ''
        last_name = " ".join(full_name.split()[1:]) if len(full_name.split()) > 1 else ''

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=first_name,
            last_name=last_name
        )

        PartnerProfile.objects.create(
            user=user,
            role=validated_data.get('role', 'associate_partner'),
            phone=validated_data.get('phone', ''),
            company_name=validated_data.get('company_name', ''),
            kyc_status='approved',
            is_verified=True
        )

        return user
