from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from django.shortcuts import redirect
from django.conf import settings
from django.http import JsonResponse
from base.models import  Order
from base.utils.pay_utils import idpayUpdateDB, idpayVerify, idpayCompleteDB
import stripe
from django.http import HttpResponseRedirect
from rest_framework.views import APIView


stripe.api_key = settings.STRIPE_SECRET_KEY



@api_view(['POST'])
@permission_classes([])
@authentication_classes([])
def IdPayCallBack(request):
    data = request.data
    
    try:
        callBackPayStatus = data['status']
        trackIdpay = data['track_id']
        transId = data['id']
        order_id = data['order_id']
        
        order = Order.objects.get(_id=order_id).
        pay_entry = Idpay.objects.get(transId=transId, order=order)
        
        if order.isPaid:
            return HttpResponseRedirect(f"http://localhost:3000/payresult/{trackIdpay}/{order_id}/{transId}?db=Null")
    except:
        return Response({'detail':'Transaction processing error !'}, status=status.HTTP_400_BAD_REQUEST)
    
    else:
        # Transaction verify
        if(str(callBackPayStatus) == '10'):
            try:
                response = idpayVerify(transId, order_id)
            except:
                dbStatus = idpayUpdateDB(pay_entry, 500, trackIdpay)
                return HttpResponseRedirect(f"http://localhost:3000/payresult/{trackIdpay}/{order_id}/{transId}?db={dbStatus}")
            else:
                
                if(str(response.status_code).startswith('2')):
                    resJson = response.json()
                    dbStatus = idpayCompleteDB(resJson)
                    return HttpResponseRedirect(f"http://localhost:3000/payresult/{trackIdpay}/{order_id}/{transId}?db={dbStatus}")
                else:
                    dbStatus = idpayUpdateDB(pay_entry, 400, trackIdpay)
                    return HttpResponseRedirect(f"http://localhost:3000/payresult/{trackIdpay}/{order_id}/{transId}?db={dbStatus}")
        else:
            dbStatus = idpayUpdateDB(pay_entry, callBackPayStatus, trackIdpay)
            return HttpResponseRedirect(f"http://localhost:3000/payresult/{trackIdpay}/{order_id}/{transId}?db={dbStatus}")




@api_view(['POST'])
def test_payment(request):
    test_payment_intent = stripe.PaymentIntent.create(
        amount=1000,
        currency='AED',
        payment_method_types=['card'],
        receipt_email='zshangi@example.com',
    )

    return Response(status=status.HTTP_200_OK, data=test_payment_intent)


@api_view(['POST'])
def confirm_payment_intent(request):
    data = request.data
    payment_intent_id = data['payment_intent_id']

    stripe.PaymentIntent.confirm(payment_intent_id)

    return Response(status=status.HTTP_200_OK, data={"message": "Success"})


@api_view(['POST'])
def save_stripe_info(request):
    data = request.data
    email = data['email']
    amount = data['amount']
    amount=amount
    payment_method_id = data['payment_method_id']
    extra_msg = ''
    # checking if customer with provided email already exists
    customer_data = stripe.Customer.list(email=email).data
    print(customer_data)

    if len(customer_data) == 0:
        # creating customer
        customer = stripe.Customer.create(
            email=email,
            payment_method=payment_method_id,
            invoice_settings={
                'default_payment_method': payment_method_id
            }
        )
    else:
        customer = customer_data[0]
        extra_msg = "Customer already existed."

    # creating paymentIntent

    stripe.PaymentIntent.create(customer=customer,
                                payment_method=payment_method_id,
                                currency='AED', amount=amount,
                                confirm=True)



    return Response(status=status.HTTP_200_OK, data={'message': 'Success', 'data': {'customer_id': customer.id,
                                                                                    'extra_msg': extra_msg}})

