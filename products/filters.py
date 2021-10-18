from django_filters import rest_framework as filters

from products.models import Product


class ProductFilter(filters.FilterSet):
    """ Filtering products by price and categories
    """
    min_price = filters.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = filters.NumberFilter(field_name="price", lookup_expr='lte')

    class Meta:
        model = Product
        fields = ['categories__slug', 'product_sizes__size']
