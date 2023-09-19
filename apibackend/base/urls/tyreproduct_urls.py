from django.urls import path,re_path
from base.views import product_views as views
from django.views.generic import TemplateView


urlpatterns = [
    path('',views.getTyreProducts,name='all-tyreproducts'),
    path('<str:pk>/',views.getTyreProductbyId,name='typeproduct-Id'),
    path('tyre/<str:pk>/',views.getTyreProductByTyre,name='tyreproduct-tyre'),


]
