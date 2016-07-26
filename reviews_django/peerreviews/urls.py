
from django.contrib import admin

from peerreviews.views import ReviewerViewSet, reviewslist, ReviewslistViewSet, AuthenticateUser, SubmissionEvallistViewSet, EmailViewSet, UserViewSet, ReviewslistIdViewSet, checkLoggedIn, logoutUser, getUsername, submisisonAssignmentViewSet, getReviewerid, submissionslist
from django.conf.urls import include, url
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'reviewers', ReviewerViewSet)
router.register(r'reviewerassignments', submisisonAssignmentViewSet)
router.register(r'submissionevals',SubmissionEvallistViewSet)
#router.register(r'submissionslists',submissionslist,base_name="getmysubmissions")

router.register(r'users', UserViewSet)


urlpatterns = [

    url(r'^admin/', admin.site.urls),
    url(r'^api/', include(router.urls)),
    url(r'^api/checklogin/', checkLoggedIn.as_view(), name='checklogin'),
    url(r'^api/userlogout/', logoutUser.as_view(), name='logoutuser'),
    url(r'^api/username/', getUsername.as_view(), name='username'),
    url(r'^api/reviewerid/', getReviewerid.as_view(), name='userid'),
    url(r'^api/reviewslists/(?P<pk>[0-9]+)/', reviewslist.as_view({'get':'getreview'}), name='review'),

    url(r'^api/reviewslists/', reviewslist.as_view({'get':'getmyreviews'}), name='myreviewslist'),
    url(r'^api/submissionslists/(?P<pk>[0-9]+)/', submissionslist.as_view({'get': 'getsubmission'}), name='submission'),

    url(r'^api/submissionslists/', submissionslist.as_view({'get':'getmysubmissions'}), name='mysubmissionslist'),

    url(r'^api/emails/', EmailViewSet.as_view(), name='email'),
    url(r'^login/', include('auth.urls', namespace='login')),
    url(r'^admin/', admin.site.urls, name='admin'),
    url(r'^authenticate/', AuthenticateUser.as_view(), name='authenticate'),
    url(r'^api/', include(router.urls)),
]