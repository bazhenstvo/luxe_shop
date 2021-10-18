from django.conf import settings
from django_filters import rest_framework as filters
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework.filters import SearchFilter
from rest_framework.viewsets import ReadOnlyModelViewSet

from products.filters import ProductFilter
from products.models import Product
from products.serializers import ProductSerializer


@method_decorator(cache_page(settings.CACHE_TTL), name='dispatch')
class ProductViewSet(ReadOnlyModelViewSet):
    """
    list: List all products

    retrieve: Retrieve specific product
    """
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    lookup_field = 'slug'
    filter_backends = [SearchFilter, filters.DjangoFilterBackend]
    filterset_class = ProductFilter
    search_fields = ['title']
