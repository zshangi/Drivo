from rest_framework import status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from base.models import ServiceCenter,Timetable
from base.serializers import TimeTableSerializer,ServicecentersSerializer



@api_view(['GET'])
def getservicecenter(request):
        order = ServiceCenter.objects.all()
        serializer = ServicecentersSerializer(order,many=True)
        return Response(serializer.data)

  
@api_view(['GET'])
def getMyTimetables(request):
    timetables = Timetable.objects.all()
    serializer = TimeTableSerializer(timetables,many=True)
    return Response(serializer.data)