# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from model_field_choices import SUBSCRIPTION
#from __future__ import unicode_literals
from django.template.defaultfilters import slugify
from django.contrib.auth.models import User



# Create your models here.
class UserAccount(models.Model):
    """
    Model representing user details
    """
    user = models.OneToOneField(User)
    subscription_type = models.CharField(max_length=1, choices=SUBSCRIPTION, help_text="Enter the subscription plan for the user (e.g. basic,  etc.)" ,null = True, blank = True)

    # def __str__(self):
    #     """
    #     String for representing the Model object (in Admin site etc.)
    #     """
    #     return self.
