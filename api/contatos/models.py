# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from operadoras.models import Operadora


class Contato(models.Model):
	nome = models.CharField('Nome', max_length=50)
	telefone = models.CharField('Telefone', max_length=50)
	data = models.DateField('Data de nascimento')
	operadora = models.ForeignKey(Operadora)

	def __unicode__(self):
		return self.nome
