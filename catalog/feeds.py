from django.contrib.syndication.views import Feed
from django.core.urlresolvers import reverse
from django.utils import feedgenerator
from datetime import datetime
from catalog.models import Article
from django.contrib.syndication.views import Feed

# from catalog.models import NewsItem
#
#
#
# class LatestEntriesFeed(Feed):
#     title = "Police beat site news"
#     link = "/sitenews/"
#     description = "Updates on changes and additions to police beat central."
#
#     def items(self):
#         return NewsItem.objects.order_by('-pub_date')[:5]
#
#     def item_title(self, item):
#         return item.title
#
#     def item_description(self, item):
#         return item.description
#
#     # item_link is only needed if NewsItem has no get_absolute_url method.
#     def item_link(self, item):
#         return reverse('news-item', args=[item.pk])



class ArticlesFeed(Feed):
    title = "My articles"
    description_template = "feeds/articles.html"

    def items(self):
        return Article.objects.order_by('-pub_date')[:5]

    def get_context_data(self, **kwargs):
        context = super(ArticlesFeed, self).get_context_data(**kwargs)
        context['foo'] = 'bar'
        return context
