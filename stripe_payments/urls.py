from django.urls import path

from stripe_payments import views

urlpatterns = [
    path('create_payment/', views.create_checkout_session, name='create_payment'),
    path('stripe_webhook/', views.stripe_webhook, name='stripe_webhook')
]