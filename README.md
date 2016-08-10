Peer Reviews
============

[![Master Build Status](https://travis-ci.org/cameronblandford/osf_peerreview_front.svg?branch=master)](https://travis-ci.org/cameronblandford/osf_peerreview_front)

Peer review is an evaluation of scientific, academic, or professional work by others working in the same field for a conference or other event. It is an isolated, pluggable peer review service that can interact with a variety of other meetings, conference, and convention services via API calls to provide otherwise missing functionality.

### Overview
Some stuff here about the basic way that PR works
Conferences can be imported.
Submissions from those conferences will also be imported (or they can be stored in our backend)
Editors can be assigned to those conferences.
Editors can assign reviewers to submissions (by creating a blank evaluation)
Reviewers fill out the evaluations, and the respective editors are notified
Editors make a final decision, with advice from the evaluations, to accept or reject the paper in behalf of the conference.

### Peer Review Workflow

![Peer Review User Workflow](https://raw.githubusercontent.com/cameronblandford/osf_peerreview_front/master/Peer%20Reviews%20Documentation.png)

### Setup
Install Ember@2.6
```$npm install -g ember-cli@2.6
$npm install
$bower install```

Install Python dependencies
```$mkvirtualenv pr
$pip install requirements.txt```

* Ask Cameron, Sherif, or Ryan for a copy of access.txt and where to put it. Peer Reviews will not run without this file.

### User’s Notes

1. A conference is created externally.
2. An admin logs into the peer reviews system (PR hereafter) and specifies the endpoint for that conference. The admin also specifies the endpoint where the submissions to the conference will come from. PR will expect a specific JSON format from the third-party API with the conferences and submissions on it.
3. The admin will specify editors.
4. Editors will have the ability to look through the submissions to the conference and assign them to reviewers. Reviewers will receive an email that they are invited to review a submission. Multiple reviewers can and should be assigned to a single submission, and a reviewer can accept invitations to review multiple submissions at the same time.
5. Reviewers will then grade the submission and upload or input their comments and scoring for the submission, based on the criteria of the conference and/or its editors.
6. Editors will then be notified when all assigned reviewers have either rejected the invitation or accepted and submitted a review, and will then be encouraged to accept or reject the submission on behalf of the conference.
These decisions will be stored in a public endpoint accessible 

### Developer's Notes
#### Backend
* API endpoints:
 * Actions
 * checkLoggedIn
 * logoutUser
 * getUsername
 * getReviewerid
* Models
 * Submissions(?)
 * Reviewers
 * Evaluations
 * Users
 * Emails(?)

#### Frontend

Routes

Screens

User Login: 



OSF User Authentication:

Peer Review Profile:


My Editing (submission content):

My Editing (Assign reviewers to submission)

My Editing (Editor final decision)




My Reviews


Submission Evaluation (Content)










Submission Evaluation (Feedback)



Future Ideas
Customizable endpoint that admin adjusts 
On evaluation page, move scoring/feedback to the side, so you can see it at the same time as the paper that you’re evaluating

Need to make handel file upload. 
