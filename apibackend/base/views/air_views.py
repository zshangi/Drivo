from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from django.shortcuts import redirect
from django.conf import settings
from django.http import JsonResponse
from base.models import  Order,PayStripe,OrderItem,Timetable
from base.utils.pay_utils import idpayUpdateDB, idpayVerify, idpayCompleteDB
import stripe
from django.http import HttpResponseRedirect
from rest_framework.views import APIView
from django.core.mail import send_mail
import datetime
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
stripe.api_key = settings.STRIPE_SECRET_KEY




@api_view(['POST'])
@permission_classes([])
@authentication_classes([])
def IdPayCallBack(request):
    data = request.data
    



@api_view(['POST'])
def save_stripe_info(request):
    if request.method == 'POST':
        data = request.data
        user = request.user
        email = data['email']
        amount = data['amount']
        amount=amount
        order=data['order']
        print("order:")
        print(order)
        payment_method_id = data['payment_method_id']
        try:
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
        
            # Step 3: Create a PaymentIntent
            intent = stripe.PaymentIntent.create(
                amount=data['amount'],
                currency='AED',
                customer=customer.id,
                payment_method=data['payment_method_id'],
                off_session=True,
                confirm=True
            )
            # Step 4: Save the payment result to your model PayStripe
            payment_data = {
                'customer_id': customer.id,
                'payment_intent_id': intent.id,
                'amount': data['amount'],
                'user_id' :  data['user']['id'],
                'order_id' :  order,
        
                # Add any other relevant payment information you want to store
            }
            payment_stripe = PayStripe.objects.create(**payment_data)
            Order.objects.filter(_id=data['order']).update(isPaid=True,paidAt=datetime.datetime.now())

            orderinfo=Order.objects.get(_id=data['order'])
            iteminfo=OrderItem.objects.filter(order_id=data['order'])
            ordertimetable=orderinfo.timetable_id
            if orderinfo.servicecenter_id==13:
                    updatetimetable = Timetable.objects.filter(_id=ordertimetable).update(isAvailable=2)

            
            
            
            subject, from_email, to = 'Thanks to choose Drivo.ae', 'info@drivo.ae',  data['email']
            html_content = render_to_string('E2.html', {'orderid':order,'date':orderinfo.paidAt,'amount':orderinfo.totalPrice,'servicecenter':orderinfo.servicecenter.name,'dateservice':data['dateservice'],'timeservice':data['timeservice'],'user':orderinfo.user.first_name,'iteminfo':iteminfo,'discount':orderinfo.discount}) # render with dynamic value
            text_content = strip_tags(html_content) # Strip the html tag. So people can see the pure text at least.
            # create the email, and attach the HTML version as well.
            msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
            msg.attach_alternative(html_content, "text/html")
            msg.send()
            
            subject, from_email, to = 'Drivo.ae Job Order Email', 'info@drivo.ae',  data['servicecenteremail']
            html_content = render_to_string('E3.html', {'orderid':order,'date':orderinfo.paidAt,'amount':orderinfo.totalPrice,'servicecenter':orderinfo.servicecenter.name,'agent':orderinfo.servicecenter.user.last_name,'dateservice':data['dateservice'],'timeservice':data['timeservice'],'user':orderinfo.user.first_name,'iteminfo':iteminfo,'discount':orderinfo.discount}) # render with dynamic value
            text_content = strip_tags(html_content) # Strip the html tag. So people can see the pure text at least.
            # create the email, and attach the HTML version as well.
            msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
            msg.attach_alternative(html_content, "text/html")
            msg.send()
            
            subject, from_email, to = 'Drivo.ae Job Order Email', 'info@drivo.ae', 'info@uaetyres.com'
            html_content = render_to_string('JO.html', {'orderid':order,'date':orderinfo.paidAt,'amount':orderinfo.totalPrice,'servicecenter':orderinfo.servicecenter.name,'agent':orderinfo.servicecenter.user.lastName,'dateservice':data['dateservice'],'timeservice':data['timeservice'],'user':orderinfo.user.first_name,'iteminfo':iteminfo,'discount':orderinfo.discount}) # render with dynamic value
            text_content = strip_tags(html_content) # Strip the html tag. So people can see the pure text at least.
            # create the email, and attach the HTML version as well.
            msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
            msg.attach_alternative(html_content, "text/html")
            msg.send()
        
            return JsonResponse({'clientSecret': intent.client_secret})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)

    

