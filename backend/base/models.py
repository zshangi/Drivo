from django.db import models
from django.contrib.auth.models import User


class Tyre(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=200, null=True)
    width = models.CharField(max_length=200, null=True, blank=True)
    profile = models.CharField(max_length=200, null=True, blank=True)
    construction = models.CharField(max_length=200, null=True, blank=True)
    diameter= models.CharField(max_length=200, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
class Make(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    slug = models.CharField(max_length=200, null=True)
    make = models.CharField(max_length=200, null=True)
    logo = models.ImageField(max_length=300,null=True, blank=True)
    def __str__(self):
        return self.make


class Model(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    model = models.CharField(max_length=200, null=True)
    model_slug = models.CharField(max_length=200, null=True)
    make= models.ForeignKey(Make, on_delete=models.SET_NULL, null=True)
    year= models.CharField(max_length=200, null=True)
    def __str__(self):

        return  str(self.model)+ " (" + str(self.make.make)+")"
    
class Modification(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    model= models.ForeignKey(Model, on_delete=models.SET_NULL, null=True)
    trim = models.CharField(max_length=200, null=True)
    trim_slug= models.CharField(max_length=200, null=True)

    def __str__(self):
        return self.trim   




class VehicleTyre(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    modification= models.ForeignKey(Modification, on_delete=models.SET_NULL, null=True)
    tyre= models.ForeignKey(Tyre, on_delete=models.SET_NULL, null=True)
    trim =models.CharField(max_length=200, null=True, blank=True)
    model= models.ForeignKey(Model, on_delete=models.SET_NULL, null=True)
    wheels=models.CharField(max_length=2, choices=(('1','frontonly'), ('2','reeronly'), ('3','both')), default = 1)
    tyreName=models.CharField(max_length=200, null=True, blank=True)
    def __str__(self):
        return self.tyreName 

class Origin(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    title = models.CharField(max_length=200, null=True)
    flag = models.ImageField(null=True, blank=True)


    def __str__(self):
        return str(self.title)   
    
class Brand(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    title = models.CharField(max_length=200, null=True)
    logo = models.ImageField(null=True, blank=True)


    def __str__(self):
        return str(self.title)   
        
class Brandorigin(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    brand = models.ForeignKey(Brand,on_delete=models.SET_NULL,null=True)
    origin = models.ForeignKey(Origin,on_delete=models.SET_NULL,null=True)


    def __str__(self):
        return  str(self.brand)+ " (" + str(self.origin)+")"

class TyreProduct(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    name= models.CharField(max_length=200, null=True)
    brandorigin = models.ForeignKey(Brandorigin,on_delete=models.SET_NULL,null=True)
    tyre= models.ForeignKey(Tyre, on_delete=models.SET_NULL, null=True)
    ItCode= models.CharField(max_length=200, null=True)
    price = models.DecimalField(
        max_digits=9, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    load_index= models.CharField(max_length=200, null=True, blank=True)
    speed_index= models.CharField(max_length=200, null=True, blank=True)
    pattern= models.CharField(max_length=200, null=True, blank=True)
    RFT= models.CharField(max_length=200, null=True, blank=True)
    
    def __str__(self):
                return  str(self.name)+ " (" + str(self.tyre.name)+")"

class VehicleUser(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    trim = models.ForeignKey(Modification, on_delete=models.SET_NULL, null=True)
    name =models.CharField(max_length=200, null=True, blank=True)
    main=models.IntegerField(null=True, blank=True, default=0)
    flag=models.IntegerField(null=True, blank=True, default=1)

    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self._id

    
class ServiceCenter(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True)
    address=models.CharField(max_length=200, null=True)
    tel=models.CharField(max_length=200, null=True)
    latitude = models.CharField(max_length=200, null=True, blank=True)
    longitude = models.CharField(max_length=200, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    rating = models.DecimalField(
        max_digits=3, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    tyreServiceCenter=models.CharField(max_length=2, choices=(('1','Local'), ('2','Van'),('3','Ship')), default = 1)
    def __str__(self):
        return self.name    

class Timetable(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    servicecenter = models.ForeignKey(ServiceCenter, on_delete=models.SET_NULL, null=True)
    datetable = models.DateField()
    part_AM = models.BooleanField(default=False)
    part_PM = models.BooleanField(default=False)
    isAvailable= models.CharField(max_length=2, choices=(('1','Available'), ('2','notAvailable')), default = 1)
 
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.isAvailable
    
class Product(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True)
    tyre=models.ForeignKey(Tyre, on_delete=models.SET_NULL, null=True)
    image = models.ImageField(null=True, blank=True)
    brand = models.CharField(max_length=200, null=True, blank=True)
    origin = models.CharField(max_length=200, null=True, blank=True)
    width = models.CharField(max_length=200, null=True, blank=True)
    profile = models.CharField(max_length=200, null=True, blank=True)
    construction = models.CharField(max_length=200, null=True, blank=True)
    diameter= models.CharField(max_length=200, null=True, blank=True)
    load_index= models.CharField(max_length=200, null=True, blank=True)
    speed_index= models.CharField(max_length=200, null=True, blank=True)
    pattern= models.CharField(max_length=200, null=True, blank=True)
    RFT= models.CharField(max_length=200, null=True, blank=True)
    production_year = models.CharField(max_length=200, null=True, blank=True)
    price_without_VAT  =models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(
        max_digits=3, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=9, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    catname=models.CharField(max_length=200, null=True, blank=True)
    SPRICE1=models.CharField(max_length=200, null=True, blank=True)
    SPRICE2=models.CharField(max_length=200, null=True, blank=True)
    FITTPRICE=models.CharField(max_length=200, null=True, blank=True)
    OFFERPRICE=models.CharField(max_length=200, null=True, blank=True)
    OLDFITTPRICE=models.CharField(max_length=200, null=True, blank=True)
    procode=models.CharField(max_length=200, null=True, blank=True)
    show_flag = models.IntegerField(default = 0,null=True)
    delete_flag = models.IntegerField(default = 0,null=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    
             
        




class Order(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    servicecenter = models.ForeignKey(ServiceCenter, on_delete=models.SET_NULL, null=True)
    dateservice = models.CharField(max_length=200, null=True, blank=True)
    timeservice = models.CharField(max_length=200, null=True, blank=True)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(
        max_digits=9, decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(
        auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.createdAt)


class OrderItem(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=9, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return str(self.name)


class ShippingAddress(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    order = models.OneToOneField(
        Order, on_delete=models.CASCADE, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    lat = models.CharField(max_length=200, null=True, blank=True)
    long = models.CharField(max_length=200, null=True, blank=True)
    details = models.CharField(max_length=200, null=True, blank=True)
    postalCode = models.CharField(max_length=200, null=True, blank=True)

    shippingPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return str(self._id)

class Review(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.rating)
        


class AddressItem(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    address=models.CharField(max_length=200, null=True, blank=True)
    lat = models.CharField(max_length=200, null=True, blank=True)
    long = models.CharField(max_length=200, null=True, blank=True)
    details = models.CharField(max_length=200, null=True, blank=True)
    def __str__(self):
        return str(self.title)  
     


    
class Post(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=200, null=True)
    image = models.ImageField(null=True, blank=True)
    content = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name    


