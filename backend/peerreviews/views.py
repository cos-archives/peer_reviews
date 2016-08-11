from rest_framework import viewsets
from rest_framework import generics
from models import Reviewer, Submission, Evaluation, Email, Editor
from serializers import ReviewerSerializer, SubmissionSerializer, ReviewSerializer, AuthenticationSerializer, EditorSerializer, EvaluationSerializer, EmailSerializer, UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.contrib.auth import logout
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.decorators import api_view


USER_STORAGE = {}
CLIENT_ID = 'f720c20605e84d52ad24cc97e03ed3a8'
CLIENT_SECRET = 'F4qpuFC364JtovxTMEN9R4i9kEAq6umSrcUi1XjR'
REDIRECT_URI = "http://localhost:4200/login"
OSF_API_URL = "https://test-api.osf.io/"
OSF_ACCOUNTS_URL = "https://test-accounts.osf.io/"


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'reviewers': reverse('reviewer-list', request=request, format=format),
        'submissions': reverse('submission-list', request=request, format=format),
        'evaluations': reverse('evaluation-list', request=request, format=format),
        'emails': reverse('email-list', request=request, format=format),
        'editors': reverse('editor-list', request=request, format=format),
    })

# TODO: update casing on these classes
class checkLoggedIn(APIView):
    """
        API endpoint that cheeck if current user is logged in.
     """
    def get(self, request, format=None):
        if request.user.is_authenticated():
            return Response('true')
        else:
            return Response('false')


class logoutUser(APIView):
    """
        API endpoint that logout the current user from system.
     """
    def get(self, request, format=None):
        if request.user.is_authenticated():
            logout(request)
            return Response('true')
        else:
            return Response('false')


class getUsername(APIView):
    """
       API endpoint that return osf username of current user.
    """
    def get(self, request, format=None):
        if request.user.is_authenticated():
            return Response(request.user.username)
        else:
            return Response('false')



class getReviewerid(APIView):
    """
       API endpoint that return reviewer id of the current user.
    """
    def get(self, request, format=None):
        if request.user.is_authenticated():
            #query reviewers by current username
            rl = Reviewer.objects.filter(user__username=request.user.username)
            ss = ReviewerSerializer(rl, context={'request': request}, many=True)
            return Response(ss.data)
        else:
            return Response('false')


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class UserDetail(APIView):
    resource_name = 'User'
    serializer_class = UserSerializer

    def get(self, request, user_id=None, format=None):
        user = User.objects.get(pk=user_id)
        user_serializer = UserSerializer(user, context={'request': request}, many=False)
        return Response(user_serializer.data)



class AuthenticateUser(APIView):
    """
        API endpoint that authenticate user login from ember.
     """
    resource_name = 'User'
    serializer_class = AuthenticationSerializer

    def post(self, request, format=None):
        serializer = AuthenticationSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.data['username']
            password = serializer.data['password']
            user = authenticate(username=username, password=password)
            if user is not None:
                # the password verified for the user
                login(request, user)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                # the authentication system was unable to verify the username and password
                return Response("The username and password were not found", status=status.HTTP_404_NOT_FOUND)
        else:
            return Response("Incorrect format for POST", status=status.HTTP_404_NOT_FOUND)


class ReviewerList(generics.ListCreateAPIView):
    """
    API endpoint that returns all reviewers.
    """
    queryset = Reviewer.objects.all()
    serializer_class = ReviewerSerializer


class ReviewerDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint that returns single reviewer
    """
    queryset = Reviewer.objects.all()
    serializer_class = ReviewerSerializer


class SubmissionList(generics.ListCreateAPIView):
    """
        API endpoint that returns all submissions that belong to current user as editor.
     """
    queryset = Submission.objects.all()
    serializer_class = SubmissionSerializer

    def get(self, request, pk=None, format=None):
        rl = Submission.objects.filter(editor__user__username=request.user.username)
        ss = SubmissionSerializer(rl, context={'request': request}, many=True)
        return Response(ss.data)


class Reviews(APIView):
    """
        API endpoint that return all reviews assigned to current user as a reviewer.
     """
    queryset = Submission.objects.all()
    serializer_class = ReviewSerializer

    def get(self, request, pk=None, format=None):
        rl = Submission.objects.filter(reviewer__user__username=request.user.username)
        ss = ReviewSerializer(rl, context={'request': request}, many=True)
        return Response(ss.data)


class SubmissionDetail(generics.RetrieveUpdateDestroyAPIView):
    """
        API endpoint that returns single submission
     """
    queryset = Submission.objects.all()
    serializer_class = SubmissionSerializer


class EvaluationList(generics.ListCreateAPIView):
    """
        API endpoint that returns all evaluations
     """
    queryset = Evaluation.objects.all()
    serializer_class = EvaluationSerializer

class EvaluationDetail(generics.ListCreateAPIView):
    """
        API endpoint that returns single evaluation.
     """
    queryset = Evaluation.objects.all()
    serializer_class = EvaluationSerializer


class EmailList(generics.ListCreateAPIView):
    """
        API endpoint that returns all emails.
     """
    queryset = Email.objects.all()
    serializer_class = EmailSerializer

    def post(self, request, format=None):
        serializer = EmailSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # send_mail(serializer.data['subject'], serializer.data['message'], serializer.data['from_email'], [serializer.data['to_email']], fail_silently=False)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EmailDetail(generics.RetrieveUpdateDestroyAPIView):
    """
        API endpoint that returns a single email record.
     """
    queryset = Email.objects.all()
    serializer_class = EmailSerializer


class EditorList(generics.ListCreateAPIView):
    """
        API endpoint that returns all editors.
     """
    queryset = Editor.objects.all()
    serializer_class = EditorSerializer

class EditorDetail(generics.RetrieveUpdateDestroyAPIView):
    """
        API endpoint that returns a single editor.
     """
    queryset = Editor.objects.all()
    serializer_class = EditorSerializer
