from django.urls import path
from base.views import air_views as views
urlpatterns = [
    path('result/', views.IdPayCallBack, name='idpay-callback'),
    path('test-payment/', views.test_payment),
    path('save-stripe-info/', views.save_stripe_info),
    path('confirm-payment-intent/', views.confirm_payment_intent),



]