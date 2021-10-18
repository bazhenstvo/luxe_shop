import environ
import stripe

from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import redirect
from django.utils import timezone
from rest_framework.decorators import api_view

from orders.models import Order

env = environ.Env()

stripe.api_key = settings.STRIPE_PRIVATE_KEY
endpoint_secret = settings.STRIPE_WEBHOOK_SECRET_KEY


@api_view(['POST'])
def create_checkout_session(request):
    """ This function passes all the data gathered from the FE to make a checkout session 
        and process a payment.
    '"""
    data = request.data
    session = stripe.checkout.Session.create(
        customer_email=data['email'],
        payment_method_types=['card'],
        line_items=[{
            'currency': 'usd',
            'amount': int(data['amount']),
            'name': f"Order # {data['order_id']}",
            'quantity': 1,
        }],
        mode='payment',
        success_url=env.str('S3_URL') + 'payment_success/',
        cancel_url=env.str('S3_URL'),
        metadata={'order_id': data['order_id']}
    )
    return redirect(session.url, code=303)


@api_view(['POST'])
def stripe_webhook(request):
    """ This webhook is used to get a response from Stripe if the payment was successful.
        If so, the order's status will become 'Paid' and be updated with payment time.
    """
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']
    event = None

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError as e:
        # Invalid payload
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return HttpResponse(status=400)

    # Handle the checkout.session.completed event
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        if session['payment_status'] == 'paid':
            order = Order.objects.get(id=session['metadata']['order_id'])
            order.is_paid = True
            order.paid_at = timezone.now()
            order.save()
    return HttpResponse(status=200)
