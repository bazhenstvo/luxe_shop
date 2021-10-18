from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView

from authentication.views import CustomTokenObtainPairView

urlpatterns = (

    path("login/", CustomTokenObtainPairView.as_view(), name='login'),
    path('', include('djoser.urls'))

)
