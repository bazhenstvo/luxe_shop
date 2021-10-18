from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

from authentication.models import User
from products.models import Product


class Order(models.Model):
	buyer = models.ForeignKey(User, verbose_name='Buyer', on_delete=models.CASCADE, related_name='orders')
	product = models.ManyToManyField(Product, verbose_name='Product', related_name='orders')
	items_price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True, verbose_name='Items price')
	tax_price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True, verbose_name='Tax price')
	total_price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True, verbose_name='Total price')
	shipping_price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True, verbose_name='Shipping price')
	created_at = models.DateTimeField(auto_now=True, verbose_name='Order created at')
	is_paid = models.BooleanField(default=False)
	paid_at = models.DateTimeField(auto_now_add=False, null=True, blank=True)

	class Meta:
		db_table = 'orders_orders'
		verbose_name = 'Order'
		verbose_name_plural = 'Orders'
		app_label = 'orders'

	def __str__(self):
		return str(self.buyer.username)


class ShippingAddress(models.Model):
	order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank=True, related_name='shipping_address')
	address = models.CharField(max_length=200, null=True, blank=True, verbose_name='Address')
	city = models.CharField(max_length=200, null=True, blank=True, verbose_name='City')
	postal_code = models.CharField(max_length=200, null=True, blank=True, verbose_name='Postal code')
	country = models.CharField(max_length=200, null=True, blank=True, verbose_name='Country')
	phone = PhoneNumberField(verbose_name='Phone', blank=True, null=True)

	class Meta:
		db_table = 'shippingaddress_orders'
		verbose_name = 'ShippingAddress'
		verbose_name_plural = 'ShippingAddress'
		app_label = 'orders'

	def __str__(self):
		return str(self.address)
