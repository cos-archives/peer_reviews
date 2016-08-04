import Ember from 'ember';

export default Ember.Controller.extend({

    islistview : true,
    isgridview: false,
    actions: {
      openreview(submission)
      {
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
      
      acceptsubmission(){
        
      },
      
      declinesubmission(){
        
      }
    }

});
