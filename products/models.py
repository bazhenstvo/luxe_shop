from django.db import models
from django.utils.text import slugify

from categories.models import Category


class Product(models.Model):
	categories = models.ManyToManyField(Category, verbose_name='Category', related_name='products')
	title = models.CharField(max_length=255, verbose_name='Title')
	slug = models.SlugField(unique=True, blank=True, null=True)
	description = models.TextField(verbose_name='Description', null=True, blank=True)
	price = models.DecimalField(max_digits=9, decimal_places=2, verbose_name='Price')
	is_active = models.BooleanField(default=False)
	number_in_stock = models.PositiveSmallIntegerField(default=0)
	created_at = models.DateTimeField(auto_now_add=True)
	last_updated_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		db_table = 'products_products'
		verbose_name = 'Product'
		verbose_name_plural = 'Products'
		app_label = 'products'
		ordering = ['-created_at']

	def __str__(self):
		return str(self.slug)

	def save(self, *args, **kwargs):
		super().save()
		if not self.slug:
			slug = slugify(self.title)
			try:
				product_obj = Product.objects.get(slug=slug)
				slug += "-" + str(self.id)
			except Product.DoesNotExist:
				pass
			self.slug = slug
			self.save()


class ProductImage(models.Model):
	product = models.ForeignKey(Product, verbose_name='Product', on_delete=models.CASCADE, related_name='product_images')
	image = models.ImageField(upload_to='media/images/', verbose_name='Image')

	class Meta:
		db_table = 'productimages_products'
		verbose_name = 'Product Image'
		verbose_name_plural = 'Product Images'
		app_label = 'products'

	def __str__(self):
		return str(self.product.slug)


class ProductSize(models.Model):
	SIZES = (
		('S', 'S'),
		('M', 'M'),
		('L', 'L'),
		('XL', 'XL'),
		('XXL', 'XXL'),
		('3XL', '3XL'),
		('4XL', '4XL'),
		('5XL', '5XL')
	)

	product = models.ForeignKey(Product, verbose_name='Product', on_delete=models.CASCADE, related_name='product_sizes')
	size = models.CharField(verbose_name='Size', max_length=255, choices=SIZES)

	class Meta:
		db_table = 'sizes_products'
		verbose_name = 'Size'
		verbose_name_plural = 'Sizes'
		app_label = 'products'

	def __str__(self):
		return str(self.size)
