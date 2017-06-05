from django.conf.urls import url
from django.contrib import admin
from django.contrib.auth import views as auth_views
from useraccount import views




urlpatterns = [
    #url(r'^login/$', auth_views.login, name='login'),

    url(r'^register/$',views.createAccountView , name='register'),
    url(r'^login/$', views.LoginView, name='login'),
    url(r'^logout/$', views.logoutView, name='logout'),
    #url(r'^login/$', auth_views.login),
]
