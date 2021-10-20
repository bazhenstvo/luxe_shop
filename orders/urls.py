from rest_framework.routers import DefaultRouter

from orders.views import OrderViewSet


router = DefaultRouter()
router.register('', OrderViewSet, basename='Order')


urlpatterns = router.urls
