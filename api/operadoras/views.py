# -*- coding: utf-8 -*-
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

from .models import Operadora
from .serializers import OperadoraSerializer


class JSONResponse(HttpResponse):
	def __init__(self, data, **kwargs):
		content = JSONRenderer().render(data)
		kwargs['content_type'] = 'application/json'
		super(JSONResponse, self).__init__(content, **kwargs)

@csrf_exempt
def api_operadoras(request):
	if request.method == 'GET':
		operadoras = Operadora.objects.all()
		serializer = OperadoraSerializer(operadoras, many=True)
		return JSONResponse(serializer.data)
