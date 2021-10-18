from rest_framework import serializers

from products.models import Product, ProductImage, ProductSize


class ProductImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductImage
        fields = ("image",)


class ProductSizeSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductSize
        fields = ("size",)


class ProductSerializer(serializers.ModelSerializer):
    product_images = ProductImageSerializer(many=True, read_only=True)
    product_sizes = ProductSizeSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ("product_images", "title", "slug", "description", "price", "product_sizes", "number_in_stock", "id", "created_at")
        read_only_fields = ('id', 'slug', 'created_at')
