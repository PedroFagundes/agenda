# -*- coding: utf-8 -*-
from rest_framework import serializers

from .models import Contato


class ContatoSerializer(serializers.ModelSerializer):
	class Meta:
		model = Contato
		fields = ('pk', 'serial', 'nome', 'telefone', 'data', 'operadora')
