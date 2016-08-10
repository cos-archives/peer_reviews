from django.conf.urls import include, url
from django.contrib.staticfiles.urls import static
from django.conf import settings


urlpatterns = [
    url(r'', include('peerreviews.urls')),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
