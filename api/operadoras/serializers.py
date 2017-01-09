# -*- coding: utf-8 -*-
from rest_framework import serializers

from .models import Operadora


class OperadoraSerializer(serializers.ModelSerializer):
	class Meta:
		model = Operadora
		fields = ('pk', 'nome', 'codigo', 'preco')
