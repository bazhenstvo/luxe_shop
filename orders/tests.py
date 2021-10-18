from django.urls import reverse
from rest_framework.test import APITestCase

from authentication.models import User
from orders.models import Order, ShippingAddress
from orders.views import OrderViewSet
from products.models import Product


class OrderViewSetTestWithAuthentication(APITestCase):
	orders = reverse("v1:orders:order-list")
	login_url = reverse("v1:authentication:login")
	login_data = {
        "email": "example@example.com", 
        "password": "2315567oi"
    }

	def setUp(self):
		self.product = Product.objects.create(title="test", price=10)
		self.user = User.objects.create_user(username="test", email="example@example.com", password='2315567oi', 
											first_name='jack', last_name='jack', address='test', phone='+380987653322')
		self.order = Order.objects.create(buyer=self.user)
		self.order.product.add(self.product)
		self.order.save()
		self.shipping_address = ShippingAddress.objects.create(address='test')

        # login to get the authentication token
		response = self.client.post(self.login_url, self.login_data)
		self.assertTrue("access" in response.json())
		token = response.json()["access"]
        # set token in the header
		self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)

	def test_create_order(self):

		response = self.client.post(self.orders, {'buyer': self.user.id,
												'shipping_address.address': self.shipping_address.address})
		self.assertEqual(response.status_code, 400)

	def test_retrieve_order(self):
		response = self.client.get(reverse("v1:orders:order-detail", kwargs={'pk': self.order.id}))
		self.assertEqual(response.status_code, 200)

	def test_retrieve_all_orders(self):
		response = self.client.get(self.orders)
		self.assertEqual(response.status_code, 200)

	def test_update_order(self):
		response = self.client.put(reverse("v1:orders:order-detail", kwargs={'pk': self.order.id}), 
																		{'buyer': self.user.id,
																		'shipping_address': 'update'})
		self.assertEqual(response.status_code, 400)

	def test_delete_order(self):
		response = self.client.delete(reverse("v1:orders:order-detail", kwargs={'pk': self.order.id}))
		self.assertEqual(response.status_code, 204)

	def test_str_method_order(self):
		self.assertEqual(str(self.order), self.order.product.first().slug)


class OrderViewSetTestNoAuthentication(APITestCase):
	orders = reverse("v1:orders:order-list")

	def setUp(self):
		self.product = Product.objects.create(title="test", price=10)
		self.user = User.objects.create_user(username="jondoe", email="example@example.com", password='2315567oi', 
											first_name='jack', last_name='jack', address='test', phone='+380987653322')
		self.order = Order.objects.create(buyer=self.user)
		self.order.product.add(self.product)
		self.order.save()

	def test_create_order(self):

		response = self.client.post(self.orders, {'buyer': self.user.id,
												'product': self.product.id,
												'comment':'hello'})
		self.assertEqual(response.status_code, 401)

	def test_retrieve_order(self):
		response = self.client.get(reverse("v1:orders:order-detail", kwargs={'pk': self.order.id}))
		self.assertEqual(response.status_code, 401)

	def test_retrieve_all_orders(self):
		response = self.client.get(self.orders)
		self.assertEqual(response.status_code, 401)

	def test_update_order(self):
		response = self.client.put(reverse("v1:orders:order-detail", kwargs={'pk': self.order.id}), 
																		{'buyer': self.user.id,
																		'product': self.product.id,
																		'comment':'bye'})
		self.assertEqual(response.status_code, 401)

	def test_delete_order(self):
		response = self.client.delete(reverse("v1:orders:order-detail", kwargs={'pk': self.order.id}))
		self.assertEqual(response.status_code, 401)


class AccessAnotherUserOrder(APITestCase):
	login_url = reverse("v1:authentication:login")
	login_data = {
        "email": "user1@example.com", 
        "password": "2315567oi"
    }

	def setUp(self):
		self.product = Product.objects.create(title="test", price=10)
		self.user1 = User.objects.create_user(username="user1", email="user1@example.com", password='2315567oi', 
											first_name='jack', last_name='jack', address='test', phone='+380987653322')
		self.user2 = User.objects.create_user(username="user2", email="user2@example.com", password='2315567oi', 
											first_name='jack', last_name='jack', address='test', phone='+380987653322')
		self.order = Order.objects.create(buyer=self.user2)
		self.order.product.add(self.product)
		self.order.save()

        # login to get the authentication token
		response = self.client.post(self.login_url, self.login_data)
		self.assertTrue("access" in response.json())
		token = response.json()["access"]
        # set token in the header
		self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)


	def test_retrieve_order(self):
		response = self.client.get(reverse("v1:orders:order-detail", kwargs={'pk': self.order.id}))
		self.assertEqual(response.status_code, 404)


	def test_update_order(self):
		response = self.client.put(reverse("v1:orders:order-detail", kwargs={'pk': self.order.id}), 
																		{'buyer': 1,
																		'product': 1,
																		'comment':'hello'})
		self.assertEqual(response.status_code, 404)

	def test_delete_order(self):
		response = self.client.delete(reverse("v1:orders:order-detail", kwargs={'pk': self.order.id}))
		self.assertEqual(response.status_code, 404)
