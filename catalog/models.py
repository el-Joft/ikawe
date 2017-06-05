# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from model_field_choices import USER_STATUS, GENDER,LOAN_STATUS, LANGUAGES, GENRE

from django.utils.encoding import python_2_unicode_compatible


# Create your models here.


class Genre(models.Model):
    """
    Model representing a book genre (e.g. Science Fiction, Non Fiction).
    """
    name = models.CharField(max_length=2, choices=GENRE, help_text="Enter a book genre (e.g. Science Fiction, French Poetry etc.)")

    def __str__(self):
        """
        String for representing the Model object (in Admin site etc.)
        """
        return self.name


import base64
from django.db import IntegrityError
import uuid  # Required for unique book instances
from datetime import date
from catalog.helper import generateE_id
# Required to assign User as a borrower
from django.contrib.auth.models import User


@python_2_unicode_compatible
class Book(models.Model):
    """
    Model representing a book (but not a specific copy of a book).
    """
    title = models.CharField(max_length=200)
    author = models.ManyToManyField('Author')
    # Foreign Key used because book can only have one author, but authors can have multiple books
    # Author as a string rather than object because it hasn't been declared
    # yet in file.

    summary = models.TextField(max_length=7000, help_text="Enter a brief description of the book")
    isbn = models.CharField('ISBN', max_length=13,  blank=True, null=True,  help_text='13 Character <a href="https://www.isbn-international.org/content/what-isbn">ISBN number</a>')
    genre = models.ManyToManyField(Genre, help_text="Select a genre for this book")
    publisher = models.CharField(max_length=300, null=True, help_text="Enter the publisher of the book")
    # price =	models.IntegerField(default = 0)
    # discount_price = models.IntegerField(default = 0)
    # ManyToManyField used because Subject can contain many books. Books can cover many subjects.
    # Subject declared as an object because it has already been defined.

    language = models.CharField(max_length=1 ,choices=LANGUAGES, help_text="select a the book's natural language (e.g. English, French, Japanese etc.)")
    upload = models.FileField(upload_to='media/uploads/pdf', null=True)
    image = models.ImageField(upload_to='media/uploads/img', null=True)

    key  = models.CharField(max_length=200, null=True, blank=True, verbose_name='Book ID')
    imprint = models.CharField(max_length=200)
    due_back = models.DateField(null=True, blank=True)

    status = models.CharField(max_length=1, choices=LOAN_STATUS,blank=True, default='d', help_text='Book availability')
    price = models.IntegerField(default=0)
    discount_price = models.IntegerField(default=0 ,null=True)



    def display_genre(self):
        """
        Creates a string for the Genre. This is required to display genre in Admin.
        """
        return ', '.join([genre.name for genre in self.genre.all()[:3]])
        display_genre.short_description = 'Genre'

    def display_authors(self):
        """
        Creates a string for the Genre. This is required to display genre in Admin.
        """
        return ', '.join([author.first_name for author in self.author.all()[:3]])
        display_genre.short_description = 'Author'

    def get_absolute_url(self):
        """
        Returns the url to access a particular book instance.
        """
        return reverse('book', args=[str(self.key)])






    def save(self, *args, **kwargs):
        key = generateE_id()
        self.key = key
    # print "generate id ", e_id
        return super(Book, self).save(*args, **kwargs)

    def __str__(self):
        return self.key

    class Meta:
        verbose_name_plural = 'ID'
















    class Meta:
        ordering = ["due_back"]
        permissions = (("can_mark_returned", "Set book as returned"),)

    def __str__(self):
        """
        String for representing the Model object.
        """
        return '%s (%s)' % (self.key, self.title)




# class Id(models.Model):
#     e_id = models.CharField(max_length= 11, null=True, blank=True)

#     class Meta:
#         verbose_name_plural = 'ID'

#     def save(self, *args, **kwargs):
#         e_id = generateE_id()
#         self.e_id = e_id
#     # print "generate id ", e_id
#         return super(Id, self).save(*args, **kwargs)

#     def __str__(self):
#         return self.e_id







class Author(models.Model):
    """
    Model representing an author.
    """
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField(null=True, blank=True)
    date_of_death = models.DateField('died', null=True, blank=True)

    def get_absolute_url(self):
        """
        Returns the url to access a particular author instance.
        """
        return reverse('author-detail', args=[str(self.id)])

    def __str__(self):
        """
        String for representing the Model object.
        """
        return '%s, %s' % (self.last_name, self.first_name)


class Article(models.Model):
    title = models.CharField(max_length=100)
    link = models.URLField(max_length=200)
    description = models.TextField(max_length=1000)
    language = "en"
    feed_url = models.URLField(max_length=200)
    author = models.ForeignKey('Author', on_delete=models.SET_NULL, null=True)
