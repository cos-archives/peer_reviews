// Code Description:
// =================

//Controller variables:
//---------------------
// islistview / isgridview : boolean variables to indicate whether list or grid views will show up or not. Note: Grid view is not used for the current version



//Controller actions:
//-------------------
//openreview: transition from current route to evaluation route, with the submission id  
//showdata:  show invitation email modal
//showlist / showgrid: switch between list and grid views. Note: Grid view is not used for the current version
//decidesubmission: handle reviwer repsonse to invitation which can be accept or decline. Note to be updated due to changes at backend.


import Ember from "ember";
export default Ember.Controller.extend( {
    islistview: true,
    isgridview: false,
    actions: {
      openreview(submission) {
        this.transitionToRoute('evaluation', {queryParams: {sub: submission}});
      },

      showlist(){
        this.set('islistview',true);
        this.set('isgridview',false);
      },

      showgrid(){
        this.set('islistview',false);
        this.set('isgridview',true);
      },

    
      storereviewerInfo(id){
        this.set('isshowingBio',true);
        this.set('reviewerInfo',this.store.findRecord('reviewer', id));
      },
       
      decidesubmission(did,sname,status){
        //get reviewer id
        let self = this;
        var rid = null;
        Ember.$.ajax({
          url: "http://localhost:8000/reviewerid",
          dataType: 'json',
          contentType: 'text/plain',
          xhrFields: {
            withCredentials: true
          }
        }).then(function(response) {
          //assigne record model is no longer used. Need to be updated 
          rid = response.data[0].id;

          let assignrecord = self.store.createRecord('reviewerassignment');
          assignrecord.submission = did;
          assignrecord.reviewer = rid;
          assignrecord.status = status;
          assignrecord.save();
        },function (response) {
          
          //store email activity and send invitation using mailgun service.
          
          self.set('emailbody',self.get('msgtemplate').replace("{cname}",response.data[0].name).replace('{ptitle}',sname));
          let emailrecord = self.store.createRecord('email');
          //using this email for testing
          emailrecord.from_email = 'sherif_hany@hotmail.com';
          emailrecord.to_email = 'sherief@vbi.vt.edu';
          emailrecord.message = self.get('emailbody');
          emailrecord.subject = 'Review Invitation';
          emailrecord.save();
        });
      }
    }
} );
