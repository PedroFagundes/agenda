# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


class Operadora(models.Model):
	nome = models.CharField('Nome', max_length=50)
	codigo = models.PositiveSmallIntegerField(u'Codigo de área')
	preco = models.DecimalField('Preço por minuto', max_digits=5, decimal_places=2)

	def __unicode__(self):
		return self.nome
