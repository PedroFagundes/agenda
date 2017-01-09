# -*- coding: utf-8 -*-
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

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
		serializer = ContatoSerializer(data=request.body)
		import pdb; pdb.set_trace()		
