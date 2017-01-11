# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from operadoras.models import Operadora


class Contato(models.Model):
	serial = models.CharField('Serial', max_length=20, blank=True, null=True)
	nome = models.CharField('Nome', max_length=50)
	telefone = models.CharField('Telefone', max_length=50)
	data = models.DateField('Data de nascimento', blank=True, null=True)
	operadora = models.ForeignKey(Operadora, blank=True, null=True)

	def __unicode__(self):
		return self.nome
