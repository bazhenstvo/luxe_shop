from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated

from orders.models import Order
from orders.serializers import OrderSerializer


class OrderViewSet(mixins.CreateModelMixin,
                   mixins.ListModelMixin,
                   mixins.RetrieveModelMixin,
                   viewsets.GenericViewSet):
    """
    create: Create the order for the authenticated user

    list: List all the orders for the authenticated user

    retrieve: Retrieve specific order for the authenticated user

    """
    queryset = Order.objects.all().order_by('-created_at')
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None

    def get_queryset(self):
        queryset = Order.objects.all().order_by('-created_at')
        query_set = queryset.filter(buyer=self.request.user)
        return query_set
