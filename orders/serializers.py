from django.utils import formats
from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer

from orders.models import Order, ShippingAddress
from authentication.models import User
from products.models import Product
from products.serializers import ProductSerializer


class BuyerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "first_name", "last_name", "address", "phone", "email", "address")
        read_only_fields = ('id', )


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        exclude = ['order']
        read_only_fields = ('id', )


class OrderSerializer(WritableNestedModelSerializer):
    buyer = BuyerSerializer()
    product = ProductSerializer(many=True)
    created_at = serializers.SerializerMethodField()
    paid_at = serializers.SerializerMethodField()
    shipping_address = ShippingAddressSerializer()

    def get_created_at(self, obj):
        return formats.date_format(obj.created_at, 'DATETIME_FORMAT')

    def get_paid_at(self, obj):
        try:
            return formats.date_format(obj.paid_at, 'DATETIME_FORMAT')
        except AttributeError:
            pass

    class Meta:
        model = Order
        fields = ("id", "product", "buyer", "items_price", "tax_price", "total_price", "shipping_price",
                  "shipping_address", "created_at", "is_paid", "paid_at")
        read_only_fields = ('id', 'slug', 'created_at')

    def __init__(self, *args, **kwargs):
        super(OrderSerializer, self).__init__(*args, **kwargs)
        try:
            if 'POST' in self.context['request'].method:
                self.fields['buyer'] = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), 
                                                                          default=serializers.CurrentUserDefault())
                self.fields['product'] = serializers.PrimaryKeyRelatedField(many=True, queryset=Product.objects.all())
        except KeyError:
            pass
