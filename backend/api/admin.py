from django.contrib import admin
from .models import Solution, Industry, Property, PartnerInquiry, PartnerProfile, NetworkMetric, FAQItem

admin.site.site_header = "COREAL Administration — The Perfect Space"
admin.site.site_title = "COREAL Admin Portal"
admin.site.index_title = "Commercial Real Estate Network Management"

@admin.register(PartnerInquiry)
class PartnerInquiryAdmin(admin.ModelAdmin):
    list_display = (
        'full_name', 'company_name', 'phone', 'email', 
        'inquiry_type', 'target_pincode', 'solution_type', 'status', 'created_at'
    )
    list_filter = ('inquiry_type', 'status', 'created_at')
    search_fields = ('full_name', 'company_name', 'phone', 'email', 'target_pincode', 'city')
    list_editable = ('status',)
    readonly_fields = ('created_at',)
    date_hierarchy = 'created_at'
    fieldsets = (
        ('Contact Information', {
            'fields': ('full_name', 'company_name', 'phone', 'additional_phone', 'email')
        }),
        ('Requirements & Location', {
            'fields': ('inquiry_type', 'solution_type', 'target_pincode', 'city', 'state', 'space_size_sqft', 'tenure')
        }),
        ('Partner Organization Details', {
            'fields': ('company_type', 'business_type', 'message')
        }),
        ('Institutional Mandate Status', {
            'fields': ('status', 'created_at')
        }),
    )

@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = (
        'title', 'space_type', 'city', 'state', 'pincode', 
        'area_sqft', 'listing_type', 'is_verified', 'created_at'
    )
    list_filter = ('space_type', 'city', 'state', 'listing_type', 'is_verified')
    search_fields = ('title', 'city', 'pincode', 'locality')
    list_editable = ('is_verified',)
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'created_at'

@admin.register(Solution)
class SolutionAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'popular')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name', 'description')

@admin.register(Industry)
class IndustryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name', 'description')

@admin.register(PartnerProfile)
class PartnerProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'role', 'company_name', 'phone', 'city', 'kyc_status', 'is_verified', 'created_at')
    list_filter = ('role', 'kyc_status', 'is_verified')
    search_fields = ('user__username', 'user__email', 'company_name', 'phone', 'city')
    list_editable = ('kyc_status', 'is_verified')

@admin.register(NetworkMetric)
class NetworkMetricAdmin(admin.ModelAdmin):
    list_display = ('label', 'value', 'subtext', 'order')
    list_editable = ('value', 'order')

@admin.register(FAQItem)
class FAQItemAdmin(admin.ModelAdmin):
    list_display = ('question', 'column', 'category', 'order', 'is_active')
    list_filter = ('column', 'category', 'is_active')
    list_editable = ('order', 'is_active')
    search_fields = ('question', 'answer')
