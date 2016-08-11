from django.test import TestCase
from django.contrib.auth.models import User
from models import Reviewer, Editor, Submission, Evaluation
import datetime

# Create your tests here.
class EvaluationTestCase(TestCase):

    def setUp(self):

        u = User()
        u.username = 'reviewerluke'
        u.save()

        r = Reviewer()
        r.user = u
        r.name = 'Luke'
        r.affiliation = 'COS'
        r.email = 'luke@cos.io'
        r.bio = 'I love to have fun.'
        r.research = 'Fun Facts'
        r.website = 'http://lukemarsh.com'
        r.osfreviews = 0
        r.save()

        s = Submission()
        s.conference = 'FooCon'
        s.title = 'Effects of Foo on Bar'
        s.reviewdeadline = datetime.date(2016, 12, 25).isoformat()
        s.authorname = 'Foo Bar'
        s.authoremail = 'foobar@baz.com'
        s.status = 'Awaiting review'
        s.link = 'http://foobar.org'
        s.attachment = '/foo/bar.pdf'
        s.save()

        s.reviewer.add(r)
        s.save()

        u2 = User()
        u2.username = 'editortom'
        u2.save()

        ed = Editor()
        ed.user = u2
        ed.name = 'Tom Heatwole'
        ed.email = 'tom@cos.io'
        ed.save()

        s.editor = ed
        s.save()

        ev = Evaluation()
        ev.status = 'Pending'
        ev.progress = 'Received'
        ev.premise = 5
        ev.research = 6
        ev.style = 4
        ev.comment = 'This is a comment.'

        ev.reviewer = r
        ev.submission = s
        ev.save()

    # reviewers should be able to edit evaluations
    def test_reviewers_can_edit_evaluations(self):
        pass

    # editors should be able to make new evaluations
    def test_editors_can_make_evaluations(self):
        pass

    # reviewers shouldn't be able to make new evaluations
    def test_reviewers_cant_make_evaluations(self):
        pass

    # editors shouldn't be able to edit evaluations
    def test_editors_cant_edit_evaluations(self):
        pass
