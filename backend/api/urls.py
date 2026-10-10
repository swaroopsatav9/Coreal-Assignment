from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    api_overview, SolutionViewSet, IndustryViewSet, PropertyViewSet,
    PartnerInquiryViewSet, NetworkMetricViewSet, FAQItemViewSet,
    login_view, register_view, current_user_view, logout_view
)

router = DefaultRouter()
router.register(r'solutions', SolutionViewSet, basename='solution')
router.register(r'industries', IndustryViewSet, basename='industry')
router.register(r'properties', PropertyViewSet, basename='property')
router.register(r'inquiries', PartnerInquiryViewSet, basename='inquiry')
router.register(r'metrics', NetworkMetricViewSet, basename='metric')
router.register(r'faqs', FAQItemViewSet, basename='faq')

urlpatterns = [
    path('', api_overview, name='api-overview'),
    path('auth/login/', login_view, name='auth-login'),
    path('auth/register/', register_view, name='auth-register'),
    path('auth/user/', current_user_view, name='auth-user'),
    path('auth/logout/', logout_view, name='auth-logout'),
    path('', include(router.urls)),
]
