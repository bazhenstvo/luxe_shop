from django.contrib import admin, messages
from django.utils.translation import ngettext

from products.models import Product, ProductImage, ProductSize


class ProductImageAdmin(admin.StackedInline):
    model = ProductImage


class SizeAdmin(admin.StackedInline):
    model = ProductSize


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductImageAdmin, SizeAdmin]
    list_display = ['title', 'slug', 'price', 'is_active', 'number_in_stock', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['title']
    ordering = ['-created_at']
    actions = ['mark_active', 'mark_not_active', 'mark_sold', 'mark_not_sold']

    def mark_active(self, request, queryset):
        active = queryset.update(is_active=True)
        self.message_user(request, ngettext(
            '%d product was successfully marked as active.',
            '%d products were successfully marked as active.',
            active,
        ) % active, messages.SUCCESS)
    mark_active.short_description = "Mark selected products as active"

    def mark_not_active(self, request, queryset):
        not_active = queryset.update(is_active=False)
        self.message_user(request, ngettext(
            '%d product was successfully marked as not active.',
            '%d products were successfully marked as not active.',
            not_active,
        ) % not_active, messages.SUCCESS)
    mark_not_active.short_description = "Mark selected products as not active"

    def mark_sold(self, request, queryset):
        active = queryset.update(is_sold=True)
        self.message_user(request, ngettext(
            '%d product was successfully marked as sold.',
            '%d products were successfully marked as sold.',
            active,
        ) % active, messages.SUCCESS)
    mark_sold.short_description = "Mark selected products as sold"

    def mark_not_sold(self, request, queryset):
        not_active = queryset.update(is_sold=False)
        self.message_user(request, ngettext(
            '%d product was successfully marked as not sold.',
            '%d products were successfully marked as not sold.',
            not_active,
        ) % not_active, messages.SUCCESS)
    mark_not_sold.short_description = "Mark selected products as not sold"
