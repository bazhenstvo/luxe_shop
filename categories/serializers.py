from rest_framework import serializers

from categories.models import Category
from products.serializers import ProductSerializer


class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ("name", "slug", "products")
        read_only_fields = ('id', 'slug', 'created_at')
