from django.urls import path
from base.views.product_views import ProductViewSet 
from rest_framework import routers
from base.views import product_views as views


products_router=routers.DefaultRouter()
products_router.register('',ProductViewSet)
urlpatterns=products_router.urls