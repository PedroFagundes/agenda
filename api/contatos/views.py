# -*- coding: utf-8 -*-
import json
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

from .models import Contato
from .serializers import ContatoSerializer


class JSONResponse(HttpResponse):
	def __init__(self, data, **kwargs):
		content = JSONRenderer().render(data)
		kwargs['content_type'] = 'application/json'
		super(JSONResponse, self).__init__(content, **kwargs)

@csrf_exempt
def api_contatos(request):
	if request.method == 'GET':
		contatos = Contato.objects.all()
		serializer = ContatoSerializer(contatos, many=True)
		return JSONResponse(serializer.data)
	if request.method == 'POST':
		dados = json.loads(request.body)
		serializer = ContatoSerializer(data=dados)
		if serializer.is_valid():
			contato = serializer.save()
			return JsonResponse(serializer.data, status=201)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
