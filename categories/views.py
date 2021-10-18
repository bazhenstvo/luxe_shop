from django.conf import settings
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework.viewsets import ReadOnlyModelViewSet

from categories.models import Category
from categories.serializers import CategorySerializer


@method_decorator(cache_page(settings.CACHE_TTL), name='dispatch')
class CategoryViewSet(ReadOnlyModelViewSet):
    """
    list: List all categories

    retrieve: Retrieve specific category
    """
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer
    lookup_field = 'slug'
