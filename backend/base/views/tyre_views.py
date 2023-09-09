from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models import Tyre
from base.serializers import TyreSerializer


@api_view(['GET'])
def gettyre(request):
        tyre = Tyre.objects.all().order_by('width')
        serializer = TyreSerializer(tyre,many=True)
        return Response(serializer.data)


