from django.contrib import admin, messages
from django.utils.translation import ngettext

from orders.models import Order, ShippingAddress


class ShippingAddressAdmin(admin.StackedInline):
    model = ShippingAddress


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    inlines = [ShippingAddressAdmin]
    list_display = ['buyer', 'first_name', 'last_name', 'address', 'phone', 'created_at']
    list_filter = ['created_at']
    list_display_links = ['buyer']
    search_fields = ['product__title', 'buyer__username']
    ordering = ['-created_at']

    def first_name(self, instance):
        return instance.buyer.first_name

    def last_name(self, instance):
        return instance.buyer.last_name

    def address(self, instance):
        return instance.buyer.address

    def phone(self, instance):
        return instance.buyer.phone
