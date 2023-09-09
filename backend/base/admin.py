from django.contrib import admin
from .models import *

admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)

admin.site.register(ServiceCenter)
admin.site.register(Timetable)
admin.site.register(Tyre)
admin.site.register(AddressItem)
admin.site.register(VehicleUser)
admin.site.register(Make)
admin.site.register(Model)
admin.site.register(Modification)
admin.site.register(VehicleTyre)

admin.site.register(Origin)
admin.site.register(Brand)
admin.site.register(Brandorigin)
admin.site.register(TyreProduct)

