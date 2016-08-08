

from django.contrib import admin

from .models import Reviewer,Submission, Evaluation, Email, Editor

admin.site.register(Reviewer)
admin.site.register(Editor)
admin.site.register(Submission)
admin.site.register(Evaluation)
admin.site.register(Email)
