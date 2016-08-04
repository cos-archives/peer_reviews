from django.contrib.auth.models import User, Group
from models import Reviewer, Submission, Evaluation, Email, Editor, Reviewerassignment
from rest_framework import serializers as ser
from rest_framework_json_api import serializers, relations


class UserSerializer(ser.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'groups')

    class JSONAPIMeta:
        resource_name = 'users'


class GroupSerializer(ser.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('id', 'name')

    class JSONAPIMeta:
        resource_name = 'groups'


class ReviewerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reviewer
        fields = ('id', 'user', 'name', 'affiliation', 'email', 'bio', 'research', 'website', 'osfreviews', 'avatar')

    class JSONAPIMeta:
        resource_name = 'reviewers'


class EmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Email
        fields = ('from_email', 'to_email', 'message', 'subject')

    class JSONAPIMeta:
        resource_name = 'emails'


class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = ('id', 'datesubmitted', 'conference', 'title', 'reviewdeadline',  'author_name','author_email', 'status',
                  'link', 'attachment')

    class JSONAPIMeta:
        resource_name = 'submissions'


# class SubmissionSerializerUpdate(serializers.ModelSerializer):
#     class Meta:
#         model = Submission
#         fields = ('conference', 'title','reviewdeadline', 'status', 'link')


class ReviewerassignmentSerializer(serializers.ModelSerializer):

    # reviewer = relations.ResourceRelatedField(
    #   queryset = Reviewer.objects.all(),
    #   related_link_url_kwarg='reviewer_pk'  # still scary
    # )
    #
    # submission = relations.ResourceRelatedField(
    #   queryset = Submission.objects.all(),
    #   related_link_url_kwarg='submission_pk'  # see above
    # )

    class Meta:
        model = Reviewerassignment
        fields = ('reviewer', 'submission', 'status')

    class JSONAPIMeta:
        resource_name = 'reviewerassignments'


class EditorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Editor
        fields = ('user', 'name', 'email')

    class JSONAPIMeta:
        resource_name = 'editors'


class AuthenticationSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)

    def validate(self, data):
        return data


class EvaluationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evaluation
        fields = ('reviewer', 'submission', 'datesubmitted', 'premise', 'research', 'style', 'comment', 'total')

    class JSONAPIMeta:
        resource_name = 'evaluations'
