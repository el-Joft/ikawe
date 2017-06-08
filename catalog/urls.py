from django.conf.urls import url
from django.conf import settings
from django.conf.urls import  include
from django.conf.urls.static import static
from . import views
from django.http import HttpResponse

#from catalog.feeds import LatestEntriesFeed
from catalog.feeds import ArticlesFeed

urlpatterns = [

    url(r'^$', views.index, name = "index"),

    #url(r'^register/$', views.register, name='register'),
    url(r'^book/$', views.book, name = "book"),

    url(r'^feed/$',  ArticlesFeed()),

    url(r'^(?P<book_key>[-\w]+)/$', views.viewBook, name="viewbook"),

    url(r'^borrow/(?P<book_key>[-\w]+)/$', views.borrowView, name="borrow"),

    url(r'^book/check/', views.searchInView, name="check"),

    url(r'^borrow/(?P<book_key>[-\w]+)/reciept', views.recieptView, name="reciept"),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
