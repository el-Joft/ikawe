# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from django.views import generic
from django.shortcuts import render, redirect
from django.core.urlresolvers import reverse
from django.http import HttpResponse
from useraccount.forms import LoginForm, RegistrationForm
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required

#from django.urls import reverse #Used to generate urls by reversing the URL patterns

from catalog.models import Book, Author, Article

# Create your views here.


def index(request):
    """
    View function for home page of site.
    """

    book_lists = Book.objects.all()


    #genrate count of some of the main objects
    num_of_books = Book.objects.all().count()

    authors = Author.objects.all()
    num_authors=Author.objects.count()  # The 'all()' is implied by default.
    #
    # # Number of visits to this view, as counted in the session variable.
    # num_visits=request.session.get('num_visits', 0)
    # request.session['num_visits'] = num_visits+1




    # available_instance = BookInstance.objects.filter(status__exact ='a').count()

    num_of_author = Author.objects.all().count()
    # context = {'num_of_books':num_of_books, 'num_of_instance':num_of_instance, 'available_instance': available_instance, 'num_of_author':num_of_author}
    context = {}
    context['authors'] = authors

    context['book_lists'] = book_lists
    context['book_num'] = num_of_books
    context['author_num'] = num_of_author
    loginform = LoginForm()
    context['login_form'] = loginform
    #context['num_visits'] = num_visits
    return render(request, 'useraccount/index.html' , context )
    #return HttpResponse("this is shit")


def book(request):
    """ this is the page a user go to when signed in """

    book_lists = Book.objects.all()
    #genrate count of some of the main objects
    num_of_books = Book.objects.all().count()

    authors = Author.objects.all()
    num_authors=Author.objects.count()  # The 'all()' is implied by default.
    #
    # # Number of visits to this view, as counted in the session variable.
    # num_visits=request.session.get('num_visits', 0)
    # request.session['num_visits'] = num_visits+1

    book_lists = Book.objects.all()
    #available_instance = BookInstance.objects.filter(status__exact ='a').count()

    num_of_author = Author.objects.all().count()
    # context = {'num_of_books':num_of_books, 'num_of_instance':num_of_instance, 'available_instance': available_instance, 'num_of_author':num_of_author}
    context = {}
    context['authors'] = authors
    context['book_lists'] = book_lists
    context['book_num'] = num_of_books


    context['author_num'] = num_of_authors

    context['book_lists'] = book_lists
    login_form = LoginForm()
    context['login_form'] = login_form

    return render(request, 'catalog/book.html',context)

def viewBook(request, book_key = None ):
    #book = get_object_or_404(Book, book_key = book.key)
    authors = Author.objects.all()
    book_lists = Book.objects.all()
    print book_key
    book_attached = Book.objects.filter(key = book_key)
    #book_id = BookInstance.objects.filter(pk = request.GET.get(''))

    context = {}
    context['book_lists'] = book_lists
    context['authors'] = authors
    context['book_attached'] = book_attached

    return render(request, 'catalog/viewbook.html', context)


@login_required
def borrowView(request, book_key=None):
    book_attached = Book.objects.filter(key = book_key)

    context = {}
    context['book_attached'] = book_attached




    # if request.method == "POST":
    #     print "1234567890088"

    #     form = BorrowForm(request.POST)
    #     if form.is_valid():
    #         form.save()

    #     else:
    #         form = BorrowForm()

    #     args = {}
    #     args.update(csrf(request))
    #     args['form'] = form

    return render(request,'catalog/borrow.html', context)


import os
def p(request):
    with open('/path/to/my/file.pdf', 'r') as pdf:
        response = HttpResponse(pdf.read(), mimetype='application/pdf')
        response['Content-Disposition'] = 'inline;filename=some_file.pdf'
        return response
    pdf.closed




def searchInView(request):

    if request.method == "POST":

        search_box = request.POST['search_box']
    else:
        search_text = ''


    book = Book.objects.filter(title__contains = search_box)

    context = {}
    print book
    context['book'] = book



    return render(request, 'catalog/search.html', context)

import os,binascii

def recieptView(request, book_key = None):



    if request.method == "POST":


        topay = request.POST['topay']

        # topay =
        # print "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^"

    else:
        topay = ''

    book = Book.objects.get(key=book_key)
    borrow_id = binascii.b2a_hex(os.urandom(12))
    context = {}
    context['book'] = book
    context['borrow_id'] = borrow_id
    context['topay'] = topay

    return render(request,'catalog/reciept.html', context)