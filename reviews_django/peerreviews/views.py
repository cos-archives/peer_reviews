from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import generics
from models import Reviewer, Submission, Evaluation, Email, Editor
from serializers import ReviewerSerializer, SubmissionSerializer, AuthenticationSerializer, EditorSerializer, EvaluationSerializer, EmailSerializer, UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User, Group
from django.contrib.auth import logout
from django.db import models
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
    def get(self, request, format=None):
        if request.user.is_authenticated():
            return Response('true')
        else:
            return Response('false')


class logoutUser(APIView):
    def get(self, request, format=None):
        if request.user.is_authenticated():
            logout(request)
            return Response('true')
        else:
            return Response('false')


class getUsername(APIView):
    def get(self, request, format=None):
        if request.user.is_authenticated():
            return Response(request.user.username)
        else:
            return Response('false')


class getReviewerid(APIView):
    def get(self, request, format=None):
        if request.user.is_authenticated():
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



# Create your views here.
def post_list(request):
    return render(request, 'peerreviews/test.html', {})

class AuthenticateUser(APIView):
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


class ReviewerDetail(generics.RetrieveAPIView):
    """
    API endpoint that returns single reviewer
    """
    queryset = Reviewer.objects.all()
    serializer_class = ReviewerSerializer


class SubmissionList(generics.ListCreateAPIView):
    queryset = Submission.objects.all()
    serializer_class = SubmissionSerializer

    def get_my_submissions(self, request, pk=None, format=None):
        rl = Submission.objects.filter(reviewer__user__username=request.user.username)
        ss = SubmissionSerializer(rl, context={'request': request}, many=True)
        return Response(ss.data)


class SubmissionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Submission.objects.all()
    serializer_class = SubmissionSerializer


class EvaluationList(generics.ListCreateAPIView):
    queryset = Evaluation.objects.all()
    serializer_class = EvaluationSerializer

class EvaluationDetail(generics.ListCreateAPIView):
    queryset = Evaluation.objects.all()
    serializer_class = EvaluationSerializer


class EmailList(generics.ListCreateAPIView):
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
    queryset = Email.objects.all()
    serializer_class = EmailSerializer


class EditorList(generics.ListCreateAPIView):
    queryset = Editor.objects.all()
    serializer_class = EditorSerializer

class EditorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Editor.objects.all()
    serializer_class = EditorSerializer

