from rest_framework.filters import SearchFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, status
from rest_framework.response import Response

from orders.models import Order
from orders.serializers import OrderSerializer
from products.models import Product


class OrderViewSet(viewsets.ModelViewSet):
    """
    list: List all the orders for the authenticated user

    retrieve: Retrieve specific order for the authenticated user

    """
    queryset = Order.objects.all().order_by('-created_at')
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [SearchFilter]
    search_fields = ['product__title', 'buyer__username']
    pagination_class = None

    def get_queryset(self):
        queryset = Order.objects.all().order_by('-created_at')
        query_set = queryset.filter(buyer=self.request.user)
        return query_set
