
from django.contrib import admin

from peerreviews import views
from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [

    url(r'^admin/', admin.site.urls, name='admin'),
    url(r'^checklogin$', views.checkLoggedIn.as_view(), name='checklogin'),
    url(r'^userlogout$', views.logoutUser.as_view(), name='logoutuser'),
    url(r'^username$', views.getUsername.as_view(), name='username'),
    url(r'^reviewerid$', views.getReviewerid.as_view(), name='userid'),
    url(r'^login', include('auth.urls', namespace='login')),
    url(r'^authenticate$', views.AuthenticateUser.as_view(), name='authenticate'),
]

# TODO: do we want a user URL?
urlpatterns += format_suffix_patterns([
    url(r'^admin/', admin.site.urls),
    url(r'^$', views.api_root),
    url(r'^reviewers/$', views.ReviewerList.as_view(),
        name='reviewer-list'),
    url(r'^reviewers?/(?P<pk>[0-9]+)/$', views.ReviewerDetail.as_view(),
        name='reviewer-detail'),

    url(r'^submissions/$', views.SubmissionList.as_view(),
        name='submission-list'),
    url(r'^submissions?/(?P<pk>[0-9]+)/$', views.SubmissionDetail.as_view(),
        name='submission-detail'),

    url(r'^evaluations/$', views.EvaluationList.as_view(),
        name='evaluation-list'),
    url(r'^evaluations?/(?P<pk>[0-9]+)/$', views.EvaluationDetail.as_view(),
        name='evaluation-detail'),

    url(r'^emails/$', views.EmailList.as_view(),
        name='email-list'),
    url(r'^emails?/(?P<pk>[0-9]+)/$', views.EmailDetail.as_view(),
        name='email-detail'),

    url(r'^editors/$', views.EditorList.as_view(),
        name='editor-list'),
    url(r'^editors?/(?P<pk>[0-9]+)/$', views.EditorDetail.as_view(),
        name='editor-detail'),

])
