# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from django.contrib.auth.models import User

# Register your models here.
from .models import Author, Genre, Book, Article
#admin.site.register(Book)

admin.site.register(Genre)
# admin.site.register(BookInstance)


#define the admin class
    # to change the view of the models in the admin
@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    #to display the fields in a list view pattern
    #list_display = ('last_name', 'first_name', 'date_of_birth', 'date_of_death')
    #register the admin class with the associated model
    #to display the fields in a detail view pattern, both horizontall and vertical
    list_display = ('last_name', 'first_name', 'date_of_birth', 'date_of_death')
    fields = ['first_name', 'last_name',('date_of_birth', 'date_of_death')]
    #the above in the tuple is to show them horizintally


# class BookInline(admin.TabularInline):
#     model = Book
@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'display_authors', 'display_genre', 'id', 'price',)
    list_display_links = ('title', 'price',)
    list_filter =('genre',)
    search_fields =('title', 'author_first_name', 'genre',)
    # fieldsets = ((None, ,{
    #     'fields': ( 'imprint', 'key')}),
    #     ('Availability', {
    #     'fields': ('status', 'due_back')
    #     }),


#register the admin classes for the BookInstance using the decorator


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    """registering the admin models"""
    list_display = ('title', 'link', 'description', 'language', 'author', 'feed_url')



    # title="My Weblog",
    # link="http://www.example.com/",
    # description="In which I write about what I ate today.",
    # language="en",
    # author_name="Myself",
    # feed_url="http://example.com/atom.xml")
