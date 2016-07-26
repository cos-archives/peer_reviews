

from django.contrib import admin

from .models import Reviewer,reviewslists, submissionevals, emails, reviewerassignments, Editor

admin.site.register(Reviewer)
admin.site.register(Editor)
admin.site.register(reviewslists)
admin.site.register(submissionevals)
admin.site.register(emails)
admin.site.register(reviewerassignments)
