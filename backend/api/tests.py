from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from .models import Solution, Industry, Property, PartnerInquiry, PartnerProfile, NetworkMetric, FAQItem

class CorealPlatformTests(TestCase):
    def setUp(self):
        self.client = APIClient()

        # Seed test solution
        self.solution = Solution.objects.create(
            name="Dark Stores",
            slug="dark-stores",
            icon="Zap",
            description="Bulk dark-store deals across the pan-India network.",
            popular=True
        )

        # Seed test industry
        self.industry = Industry.objects.create(
            name="Quick Commerce",
            slug="quick-commerce",
            description="Dark stores at delivery-grade density."
        )

        # Seed test property
        self.property = Property.objects.create(
            title="Prime Micro Dark Store Unit - Andheri East",
            slug="dark-store-andheri-east-400069",
            solution=self.solution,
            space_type="Dark Store",
            city="Mumbai",
            state="Maharashtra",
            pincode="400069",
            locality="Andheri East",
            area_sqft=3200,
            price_per_sqft=110.00,
            monthly_rent=352000.00,
            listing_type="Lease",
            is_verified=True,
            verification_badge="COREAL Verified 100%",
            features=["10-Min Radius Coverage", "Ground Floor Access"]
        )

        # Seed test metrics & FAQ
        self.metric = NetworkMetric.objects.create(
            key="cities",
            value="750+",
            label="Cities",
            subtext="Across Tier 1-4",
            order=1
        )

        self.faq = FAQItem.objects.create(
            question="What is COREAL?",
            answer="COREAL is a commercial real estate network.",
            category="Platform",
            column="left",
            order=1,
            is_active=True
        )

        # Seed test user
        self.user = User.objects.create_user(
            username="testuser",
            email="testuser@coreal.in",
            password="securepassword123"
        )
        self.profile = PartnerProfile.objects.create(
            user=self.user,
            role="associate_partner",
            company_name="Test Realty Partners",
            phone="9876543210",
            is_verified=True
        )

    # 1. API Status Overview
    def test_api_overview(self):
        response = self.client.get('/api/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get('status'), 'online')
        self.assertIn('endpoints', response.data)

    # 2. Properties Listing & Filtering
    def test_get_properties(self):
        response = self.client.get('/api/properties/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['pincode'], '400069')

    def test_filter_properties_by_pincode(self):
        response = self.client.get('/api/properties/', {'pincode': '400069'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

        # Non-matching pin
        response_empty = self.client.get('/api/properties/', {'pincode': '999999'})
        self.assertEqual(response_empty.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response_empty.data), 0)

    def test_filter_properties_by_city(self):
        response = self.client.get('/api/properties/', {'city': 'Mumbai'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    # 3. Form Validation for Partner Inquiries
    def test_valid_partner_inquiry_submission(self):
        payload = {
            "full_name": "Vikram Adani",
            "company_name": "Adani Logistics Hub",
            "phone": "9812345678",
            "email": "vikram@adani.com",
            "target_pincode": "400069",
            "city": "Mumbai",
            "solution_type": "Dark Stores",
            "inquiry_type": "procure"
        }
        response = self.client.post('/api/inquiries/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['status'], 'success')
        self.assertEqual(PartnerInquiry.objects.count(), 1)
        inquiry = PartnerInquiry.objects.first()
        self.assertEqual(inquiry.full_name, "Vikram Adani")
        self.assertEqual(inquiry.phone, "9812345678")

    def test_partner_inquiry_with_phone_formatting(self):
        # Phone with +91 and dashes should be sanitized to 10 digits
        payload = {
            "full_name": "Rahul Verma",
            "phone": "+91 98765-43210",
            "email": "rahul@example.com",
            "inquiry_type": "provide"
        }
        response = self.client.post('/api/inquiries/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        inquiry = PartnerInquiry.objects.first()
        self.assertEqual(inquiry.phone, "9876543210")

    def test_invalid_phone_rejection(self):
        payload = {
            "full_name": "Fake User",
            "phone": "12345",  # Invalid format
            "email": "fake@example.com",
            "inquiry_type": "procure"
        }
        response = self.client.post('/api/inquiries/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['status'], 'error')
        self.assertIn('phone', response.data['errors'])

    def test_invalid_pincode_rejection(self):
        payload = {
            "full_name": "Test Pincode",
            "phone": "9876543210",
            "email": "pin@example.com",
            "target_pincode": "123",  # Not 6 digits
            "inquiry_type": "procure"
        }
        response = self.client.post('/api/inquiries/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('target_pincode', response.data['errors'])

    # 4. Authentication Endpoints
    def test_login_successful(self):
        payload = {
            "username": "testuser",
            "password": "securepassword123"
        }
        response = self.client.post('/api/auth/login/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], 'success')
        self.assertIn('token', response.data)
        self.assertEqual(response.data['user']['username'], 'testuser')

    def test_login_invalid_password(self):
        payload = {
            "username": "testuser",
            "password": "wrongpassword"
        }
        response = self.client.post('/api/auth/login/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['status'], 'error')

    def test_protected_user_endpoint_without_token(self):
        response = self.client.get('/api/auth/user/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_protected_user_endpoint_with_token(self):
        # First login to get token
        login_res = self.client.post('/api/auth/login/', {
            "username": "testuser",
            "password": "securepassword123"
        })
        token = login_res.data['token']

        # Query /api/auth/user/ with Token header
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {token}')
        user_res = self.client.get('/api/auth/user/')
        self.assertEqual(user_res.status_code, status.HTTP_200_OK)
        self.assertEqual(user_res.data['user']['username'], 'testuser')
        self.assertEqual(user_res.data['user']['role'], 'associate_partner')

    # 5. FAQs and Network Metrics
    def test_get_faqs(self):
        response = self.client.get('/api/faqs/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_get_metrics(self):
        response = self.client.get('/api/metrics/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['value'], '750+')
