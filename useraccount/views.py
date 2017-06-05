# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from useraccount.models import UserAccount
from useraccount.forms import LoginForm,  RegistrationForm
from django.core.urlresolvers import reverse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib import messages
# Create your views here.
from django.contrib.auth import views as auth_views
from django.contrib.auth import login, logout






def createAccountView(request):
    #return HttpResponse("we are in the registration page")

    context = {}
    reg_form = RegistrationForm()

    context['reg_form'] = reg_form
    context['login_form'] = LoginForm()
    if request.method == "POST": #if the action is POST

        user_reg_form = RegistrationForm(data = request.POST)
        rp = request.POST
        if User.objects.filter(email = rp['email']).exists(): #to check if the user exist
            # print "this user has been taken"
            messages.info(request, "sorry this user email has been taken")
            return redirect(reverse("useraccount:register"))

        if User.objects.filter(email= rp['username']).exists():  # to check if the user exist

            messages.info(request, "sorry this user username has been taken")
            return redirect(reverse("useraccount:register"))



        else:
            if user_reg_form.is_valid():
                #user_reg_form.save()
                user = User.objects.create(username = rp['username'], first_name = rp['first_name'], last_name= rp['last_name'], email= rp['email'])
                user.set_password(rp['password'])
                user.save()

                useraccount = UserAccount.objects.create(user = user)

                if user:
                    messages.success(request, "account details has been saved")
                    #
                    # if not rp['next'] == '':
                    #     return redirect(rp['next'])
                    # else:
                    #     return redirect('/')

                else:
                    messages.warning(request,"sorry something went wrong while saving your records, please try again.")

            else:

                context['reg_form'] = RegistrationForm(data = request.POST)#the work of this is to return is filled form if an error is throwned
                print "form is not valid.....".user_reg_form.errros


    return render(request, 'useraccount/login.html', context)




def LoginView(request):
    print "work jare"
    login_form = LoginForm()
    context = { 'login_form' : login_form }
    if request.method == 'POST':
        rp = request.POST
        login_form = LoginForm(data=request.POST)
        print "this is the rp request"
    #checks if user exists
        if User.objects.filter(email=rp['email']).exists():
            username = User.objects.get(email=rp['email']).username
            auth_user = authenticate(username=username, password=rp['password'])
            print "checking login"

            if auth_user:
                login(request, auth_user)
                # if rp['next'] != "":
                #     return redirect(rp['next'])
                # return redirect(reverse('catalog:user_newsfeed', kwargs={'user_id': request.user.username}))

                return redirect(reverse('catalog:index'))

            else:
                context['login_form'] = login_form
                messages.error(request, 'Sorry your email or password is incorrect!!')
        else:
            context['login_form'] = login_form
            messages.error(request, 'Sorry this email adddress doest not exist!!')

    context['login_form'] = login_form
    return render(request, 'useraccount/base.html', context)



def logoutView(request):
    logout(request)
    return redirect(reverse('catalog:index'))

