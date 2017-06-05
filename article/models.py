# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Article(models.Model):
    title =models.CharField(max_length = 200)
    body =models.TextField()
    pub_date = models.DateTimeField('date published')
    likes =  models.IntegerField()