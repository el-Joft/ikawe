# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

# Create your views here.
def article():
    name = "tolu"
    context['name'] = name
    return render(request, 'catalog/book.html', context)