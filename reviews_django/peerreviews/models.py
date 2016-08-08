from django.db import models
from django.contrib.auth.models import User, Group

# TODO: normalize casing in models
# TODO: add timestamp fields

class Reviewer(models.Model):
    user = models.OneToOneField(User,default=None)
    name = models.CharField(max_length=200)
    affiliation = models.TextField(null=True)
    email = models.EmailField(default=None)
    bio = models.TextField(null=True)
    research = models.TextField(null=True)
    website = models.URLField(null=True)
    osfreviews = models.IntegerField(default=0)
    avatar = models.ImageField(blank=True, null=True, upload_to='media/avatars')

    def __str__(self):
        return "Reviewer - " + self.name + " (" + self.affiliation + ")"


class Editor(models.Model):
    user = models.OneToOneField(User, default=None)
    name = models.CharField(max_length=200)
    email = models.EmailField(default=None)

    def __str__(self):
        return "Editor - " + self.name


class Submission(models.Model):
    datesubmitted = models.DateTimeField(auto_now_add=True)
    conference = models.TextField(null=True)
    title = models.TextField(null=True)
    reviewdeadline = models.DateField(default=None)
    author_name = models.TextField(null=True)
    author_email = models.TextField(null=True)
    status = models.CharField(max_length=100)
    link = models.URLField(blank=True, null=True)
    attachment = models.FileField(null=True, upload_to='media/files')
    reviewer = models.ManyToManyField(Reviewer, blank=True, default=None)
    editor = models.ForeignKey(Editor, null=True)

    def __str__(self):
        return self.title


class Email(models.Model):
    from_email = models.EmailField(null=True)
    to_email = models.EmailField(null=True)
    message = models.TextField(default=None)
    subject = models.TextField(default=None)

    def __str__(self):
        return self.from_email + ' -> ' + self.to_email


# class Reviewerassignment(models.Model):
#     reviewer = models.ForeignKey('Reviewer', related_name='reviewerassignments')
#     submission = models.ForeignKey('Submission', related_name='reviewerassignments')
#     status = models.CharField(max_length=200)


class Evaluation(models.Model):
    status = models.CharField(max_length=200)
    progress = models.CharField(max_length=200)

    datesubmitted = models.DateTimeField(auto_now_add=True)
    reviewer = models.ForeignKey(Reviewer)
    submission = models.ForeignKey(Submission)
    premise = models.IntegerField(default=0, null=True)
    research = models.IntegerField(default=0, null=True)
    style = models.IntegerField(default=0, null=True)
    comment = models.TextField(null=True)

    def __str__(self):
        return self.reviewer.name + ': ' + self.submission.title


    @property
    def total(self):
        if self.premise is None or self.research is None or self.style is None:
            return 0
        else:
            return self.premise + self.research + self.style

