from django.urls import reverse
from rest_framework.test import APIRequestFactory, APITestCase

from categories.models import Category
from products.models import Product, ProductImage
from products.views import ProductViewSet


class ProductViewSetTest(APITestCase):
	products = reverse("v1:products:product-list")

	def setUp(self):
		self.category = Category.objects.create(name="test", slug="test", is_active=True)
		self.product = Product.objects.create(title="test", price=10, number_in_stock=10)
		self.product_image = ProductImage.objects.create(product=self.product, image='test.png')

	def test_get_product(self):
		response = self.client.get(reverse('v1:products:product-detail', kwargs={'slug': self.product.slug}))
		self.assertEqual(response.status_code, 404)

	def test_get_all_products(self):
		response = self.client.get(self.products)
		self.assertEqual(response.status_code, 200)

	def test_str_method_product_image(self):
		self.assertEqual(str(self.product_image), self.product.slug)

	def test_str_method_product(self):
		self.assertEqual(str(self.product), self.product.slug)

	def test_active_product(self):
		self.assertFalse(self.product.is_active)

	def test_product_number_in_stock(self):
		self.assertEqual(self.product.number_in_stock, 10)