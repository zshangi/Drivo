from django.contrib import admin
from .models import *


admin.site.register(Review)
admin.site.register(ShippingAddress)
admin.site.register(Tyre)
admin.site.register(Brand)
admin.site.register(Origin)


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 1

class invoicefilter(admin.ModelAdmin):
    list_filter = [
         "isPaid",
         "isDelivered",
         "service",
         "createdAt"
    ]
    inlines = [OrderItemInline]
    list_display = ('user', 'servicecenter', 'service','timetable','timeservice','isPaid','createdAt','get_order_items')
    def get_order_items(self, obj):
        # Custom method to get a comma-separated list of order item names
        return ", ".join(item.tyreproduct.name for item in obj.orderitem_set.all())

    get_order_items.short_description = 'Order Items'  # Sets the column header in the admin panel

admin.site.register(Order, invoicefilter)


class voucherfilter(admin.ModelAdmin):
    list_display = ('title', 'voucher', 'typeVoucher','amount','desc')
admin.site.register(Voucher,voucherfilter)



class VehicleUserfilter(admin.ModelAdmin):
    list_filter = [
         "user",
         "trim",
    ]
    list_display = ('user','trim','main')
admin.site.register(VehicleUser,VehicleUserfilter)


class LabelCodefilter(admin.ModelAdmin):
    list_filter = [
         "label",
         "hexCode",
    ]
    list_display = ('label','hexCode')
admin.site.register(LabelCode,LabelCodefilter)


class TyreProductfilter(admin.ModelAdmin):
    list_filter = [
         "brandorigin",
         "tyre",
    ]
    list_display = ('brandorigin','price','tyre','brandpattern','productionYear')
admin.site.register(TyreProduct,TyreProductfilter)


class ServiceCenterfilter(admin.ModelAdmin):
    list_filter = [
         "tyreServiceCenter",
    ]
    list_display = ('name','user','address','tel','tyreServiceCenter')
admin.site.register(ServiceCenter,ServiceCenterfilter)


class PayStripefilter(admin.ModelAdmin):
    list_filter = [
         "user",
    ]
    list_display = ('user','order','customer_id','payment_intent_id','amount')
admin.site.register(PayStripe,PayStripefilter)



class BrandPatternfilter(admin.ModelAdmin):
    list_filter = [
         "brand",
         "pattern"
    ]
    list_display = ('brand','pattern')
admin.site.register(BrandPattern,BrandPatternfilter)


class Brandoriginfilter(admin.ModelAdmin):
    list_filter = [
         "brand",
         "origin"
    ]
    list_display = ('brand','origin')
admin.site.register(Brandorigin,Brandoriginfilter)




class Timetablefilter(admin.ModelAdmin):
    list_filter = [
         "servicecenter",
         "datetable",
         "part_AM",
         "part_PM",
    ]
    list_display = ('servicecenter','datetable','part_AM','part_PM','isAvailable')
admin.site.register(Timetable,Timetablefilter)



class Makefilter(admin.ModelAdmin):
    list_filter = [
         "slug",
         "make",
    ]
    list_display = ('slug','make')
admin.site.register(Make,Makefilter)


class Modelfilter(admin.ModelAdmin):
    list_filter = [
         "make",
         "year"
    ]
    list_display = ('model','model_slug','make','year')
admin.site.register(Model,Modelfilter)


class Modificationfilter(admin.ModelAdmin):
    list_filter = [
         "model",

    ]
    list_display = ('model','trim','trim_slug')
admin.site.register(Modification,Modificationfilter)


class VehicleTyrefilter(admin.ModelAdmin):
    list_filter = [
         "modification",
         "tyre",
         "model",
         "wheels",

    ]
    list_display = ('modification','tyre','model','wheels')
admin.site.register(VehicleTyre,VehicleTyrefilter)
