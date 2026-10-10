from django.db import models
from django.contrib.auth.models import User

class Solution(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    icon = models.CharField(max_length=50, help_text="SVG/Icon identifier (e.g. Zap, Warehouse)")
    description = models.TextField()
    popular = models.BooleanField(default=False)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.name

class Industry(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField()

    class Meta:
        verbose_name_plural = "Industries"
        ordering = ['id']

    def __str__(self):
        return self.name

class Property(models.Model):
    LISTING_TYPES = (
        ('Lease', 'Lease'),
        ('Sale', 'Sale'),
        ('Both', 'Both'),
    )

    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    solution = models.ForeignKey(Solution, on_delete=models.SET_NULL, null=True, blank=True, related_name='properties')
    space_type = models.CharField(max_length=100, default='Dark Store')
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    pincode = models.CharField(max_length=10)
    locality = models.CharField(max_length=150)
    area_sqft = models.IntegerField(help_text="Area in square feet")
    price_per_sqft = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    monthly_rent = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    listing_type = models.CharField(max_length=10, choices=LISTING_TYPES, default='Lease')
    is_verified = models.BooleanField(default=True)
    verification_badge = models.CharField(max_length=100, default="COREAL Verified 100%")
    features = models.JSONField(default=list, help_text="List of feature tags")
    description = models.TextField()
    image_url = models.CharField(max_length=500, blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Properties"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} - {self.pincode} ({self.city})"

class PartnerInquiry(models.Model):
    INQUIRY_TYPES = (
        ('procure', 'Procure Space'),
        ('provide', 'Become Partner'),
        ('contact', 'General Contact'),
    )

    STATUS_CHOICES = (
        ('Pending', 'Pending'),
        ('Shortlisted', 'Shortlisted in 48-Hrs'),
        ('Contacted', 'Contacted'),
        ('Agreement_Sent', 'One Agreement In Progress'),
        ('Activated', 'Space Activated'),
        ('Closed', 'Closed'),
    )

    inquiry_type = models.CharField(max_length=20, choices=INQUIRY_TYPES, default='procure')
    full_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    additional_phone = models.CharField(max_length=20, blank=True, default='')
    company_name = models.CharField(max_length=150, blank=True, default='')
    company_type = models.CharField(max_length=100, blank=True, default='')
    business_type = models.CharField(max_length=100, blank=True, default='')
    target_pincode = models.CharField(max_length=10, blank=True, default='')
    city = models.CharField(max_length=100, blank=True, default='')
    state = models.CharField(max_length=100, blank=True, default='')
    solution_type = models.CharField(max_length=100, blank=True, default='')
    space_size_sqft = models.CharField(max_length=50, blank=True, default='')
    tenure = models.CharField(max_length=50, blank=True, default='')
    message = models.TextField(blank=True, default='')
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Partner Inquiries"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.full_name} ({self.get_inquiry_type_display()}) - {self.phone}"

class PartnerProfile(models.Model):
    ROLE_CHOICES = (
        ('associate_partner', 'Associate Partner (Landlord / Broker)'),
        ('associate_customer', 'Associate Customer (Brand / Occupier)'),
        ('admin', 'Institutional Admin'),
    )

    KYC_STATUS_CHOICES = (
        ('pending', 'KYC Pending'),
        ('submitted', 'KYC Submitted'),
        ('approved', 'KYC Approved'),
        ('rejected', 'KYC Rejected'),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='partner_profile')
    role = models.CharField(max_length=30, choices=ROLE_CHOICES, default='associate_partner')
    company_name = models.CharField(max_length=150, blank=True, default='')
    phone = models.CharField(max_length=20, blank=True, default='')
    city = models.CharField(max_length=100, blank=True, default='')
    kyc_status = models.CharField(max_length=20, choices=KYC_STATUS_CHOICES, default='approved')
    is_verified = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} ({self.get_role_display()})"

class NetworkMetric(models.Model):
    key = models.CharField(max_length=50, unique=True)
    value = models.CharField(max_length=50)
    label = models.CharField(max_length=100)
    subtext = models.CharField(max_length=100, blank=True, default='')
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return f"{self.label}: {self.value}"

class FAQItem(models.Model):
    question = models.CharField(max_length=300)
    answer = models.TextField()
    category = models.CharField(max_length=100, default='General')
    column = models.CharField(max_length=10, choices=(('left', 'Left Column'), ('right', 'Right Column')), default='left')
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "FAQ Item"
        verbose_name_plural = "FAQ Items"
        ordering = ['order', 'id']

    def __str__(self):
        return self.question
