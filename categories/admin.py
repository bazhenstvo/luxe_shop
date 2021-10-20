from django.contrib import admin, messages
from django.utils.translation import ngettext

from categories.models import Category
from products.models import Product


class ProductAdmin(admin.StackedInline):
    model = Category.products.through


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    inlines = [ProductAdmin]
    list_display = ['name', 'is_active']
    ordering = ['name']
    actions = ['mark_active', 'mark_not_active']

    def mark_active(self, request, queryset):
        active = queryset.update(is_active=True)
        self.message_user(request, ngettext(
            '%d category was successfully marked as active.',
            '%d categories were successfully marked as active.',
            active,
        ) % active, messages.SUCCESS)
    mark_active.short_description = "Mark selected categories as active"

    def mark_not_active(self, request, queryset):
        not_active = queryset.update(is_active=False)
        self.message_user(request, ngettext(
            '%d category was successfully marked as not active.',
            '%d categories were successfully marked as not active.',
            not_active,
        ) % not_active, messages.SUCCESS)
    mark_not_active.short_description = "Mark selected categories as not active"
