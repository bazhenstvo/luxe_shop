from django.contrib import admin, messages
from django.utils.translation import ngettext

from authentication.models import User


@admin.register(User)
class UsersAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'is_active')
    ordering = ['username']
    actions = ['mark_active', 'mark_not_active']

    def mark_active(self, request, queryset):
        active = queryset.update(is_active=True)
        self.message_user(request, ngettext(
            '%d user was successfully marked as active.',
            '%d users were successfully marked as active.',
            active,
        ) % active, messages.SUCCESS)
    mark_active.short_description = "Mark selected users as active"

    def mark_not_active(self, request, queryset):
        not_active = queryset.update(is_active=False)
        self.message_user(request, ngettext(
            '%d user was successfully marked as not active.',
            '%d users were successfully marked as not active.',
            not_active,
        ) % not_active, messages.SUCCESS)
    mark_not_active.short_description = "Mark selected users as not active"
