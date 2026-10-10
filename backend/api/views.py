from rest_framework import viewsets, status, generics, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
from django.db.models import Q
from .models import Solution, Industry, Property, PartnerInquiry, PartnerProfile, NetworkMetric, FAQItem
from .serializers import (
    SolutionSerializer, IndustrySerializer, PropertySerializer, 
    PartnerInquirySerializer, NetworkMetricSerializer, FAQItemSerializer,
    UserSerializer, LoginSerializer, RegisterSerializer
)

@api_view(['GET'])
def api_overview(request):
    return Response({
        "status": "online",
        "platform": "COREAL — India's PIN-Code Based Commercial Real Estate Network",
        "version": "1.0.0",
        "flagship": "IH&MS Infra India Pvt. Ltd.",
        "frontend_app": "http://localhost:5173",
        "endpoints": {
            "properties": "/api/properties/",
            "solutions": "/api/solutions/",
            "industries": "/api/industries/",
            "inquiries": "/api/inquiries/",
            "metrics": "/api/metrics/",
            "faqs": "/api/faqs/",
            "auth": {
                "login": "/api/auth/login/",
                "register": "/api/auth/register/",
                "user": "/api/auth/user/",
                "logout": "/api/auth/logout/"
            },
            "admin": "/admin/"
        }
    })

class SolutionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Solution.objects.all()
    serializer_class = SolutionSerializer

class IndustryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Industry.objects.all()
    serializer_class = IndustrySerializer

class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer

    def get_queryset(self):
        queryset = Property.objects.all()
        query = self.request.query_params.get('q', None)
        pincode = self.request.query_params.get('pincode', None)
        city = self.request.query_params.get('city', None)
        solution = self.request.query_params.get('solution', None)
        space_type = self.request.query_params.get('space_type', None)
        listing_type = self.request.query_params.get('listing_type', None)

        if query:
            queryset = queryset.filter(
                Q(title__icontains=query) |
                Q(locality__icontains=query) |
                Q(city__icontains=query) |
                Q(pincode__icontains=query) |
                Q(space_type__icontains=query)
            )
        if pincode:
            queryset = queryset.filter(pincode__icontains=pincode)
        if city:
            queryset = queryset.filter(city__iexact=city)
        if solution:
            queryset = queryset.filter(solution__slug=solution)
        if space_type:
            queryset = queryset.filter(space_type__iexact=space_type)
        if listing_type:
            queryset = queryset.filter(listing_type__iexact=listing_type)

        return queryset

class PartnerInquiryViewSet(viewsets.ModelViewSet):
    queryset = PartnerInquiry.objects.all()
    serializer_class = PartnerInquirySerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response({
                "status": "success",
                "message": "Requirement submitted successfully. Institutional desk will respond within 48 hours.",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED, headers=headers)
        return Response({
            "status": "error",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

class NetworkMetricViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = NetworkMetric.objects.all()
    serializer_class = NetworkMetricSerializer

class FAQItemViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = FAQItemSerializer

    def get_queryset(self):
        queryset = FAQItem.objects.filter(is_active=True)
        col = self.request.query_params.get('column', None)
        if col:
            queryset = queryset.filter(column=col)
        return queryset

# Authentication Endpoints
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def login_view(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data['user']
        token, _ = Token.objects.get_or_create(user=user)
        user_serializer = UserSerializer(user)
        return Response({
            "status": "success",
            "token": token.key,
            "user": user_serializer.data,
            "message": "Successfully authenticated."
        })
    return Response({
        "status": "error",
        "errors": serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token, _ = Token.objects.get_or_create(user=user)
        user_serializer = UserSerializer(user)
        return Response({
            "status": "success",
            "token": token.key,
            "user": user_serializer.data,
            "message": "Partner account registered successfully."
        }, status=status.HTTP_201_CREATED)
    return Response({
        "status": "error",
        "errors": serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def current_user_view(request):
    serializer = UserSerializer(request.user)
    return Response({
        "status": "success",
        "user": serializer.data
    })

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def logout_view(request):
    try:
        request.user.auth_token.delete()
    except:
        pass
    return Response({
        "status": "success",
        "message": "Logged out successfully."
    })
