from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin, UserManager
from django.core import validators
from django.db import models
from django.utils.translation import ugettext_lazy as _
from phonenumber_field.modelfields import PhoneNumberField


class CustomAccountManager(UserManager):
    def create_superuser(self, username, email=None, password=None, **extra_fields):
        user = self.create_user(email=email, username=username, password=password, **extra_fields)
        user.is_active = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=150, unique=True, validators=[validators.RegexValidator(r'^[\w\.@+\-\s]+$', _('Enter a valid username. This value may contain only letters, numbers, spaces and @ . + - _ characters.'))])
    email = models.EmailField(verbose_name=_('email address'), max_length=255, unique=True)
    first_name = models.CharField(max_length=150, verbose_name='First name')
    last_name = models.CharField(max_length=150, verbose_name='Last name')
    address = models.CharField(max_length=200, null=True, blank=True, verbose_name='Address')
    city = models.CharField(max_length=200, null=True, blank=True, verbose_name='City')
    postal_code = models.CharField(max_length=200, null=True, blank=True, verbose_name='Postal code')
    country = models.CharField(max_length=200, null=True, blank=True, verbose_name='Country')
    phone = PhoneNumberField(verbose_name='Phone')
    is_staff = models.BooleanField(default=False,
                                   help_text=_('Designates whether this user can access this admin site.'),
                                   verbose_name=_('is staff'))
    is_active = models.BooleanField(default=True,
                                    help_text=_(
                                        'Designates whether this user should be treated as active. '
                                        'Unselect this instead of deleting accounts.'),
                                    verbose_name=_('is active')
    )
    is_restoring_password = models.BooleanField(default=True,
                                                help_text=_(
                                                    'Designates that this user should confirm email after password reset'),
                                                verbose_name=_('restoring_password'))
    is_superuser = models.BooleanField(default=False,
                                       help_text=_(
                                           'Designates that this user has all permissions without explicitly assigning them.'),
                                       verbose_name=_('is superuser'))
    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('username', 'first_name', 'last_name', 'address', 'city', 'country', 'postal_code', 'phone')

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        if self.is_active and self.is_staff:
            return True
        # Otherwise we need to check the backends.
        return super().has_perm(perm, obj)

    class Meta:
        db_table = 'authentication'
        verbose_name = _('user')
        verbose_name_plural = _('users')
        ordering = ['username']
