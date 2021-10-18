from django.urls import reverse
from rest_framework.test import APIRequestFactory, APITestCase

from categories.models import Category
from categories.views import CategoryViewSet


class CategoryViewSetTest(APITestCase):

	def setUp(self):
		self.category = Category.objects.create(name="test", slug="test", is_active=True)

	def test_get_category(self):
		response = self.client.get(reverse('v1:categories:category-detail', kwargs={'slug': self.category.slug}))
		self.assertEqual(response.status_code, 200)

	def test_get_all_categories(self):
		response = self.client.get(reverse('v1:categories:category-list'))
		self.assertEqual(response.status_code, 200)

	def test_active_category(self):
		self.assertTrue(self.category.is_active)

	def test_str_method(self):
		self.assertEqual(str(self.category), self.category.name)
