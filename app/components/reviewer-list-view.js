import Ember from 'ember';

export default Ember.Component.extend({
  actions:{
    showReviewer(id){
     $(".table-reviewer-more-info").css("display" , "none");
     $(".table-reviewer-more-info").eq((id-1)).css("display" , "block");

    },
    gotoreviewing() {
      var self = this;
      self.sendAction( 'gotoreviewing' );

    },
    gotoediting() {
      var self = this;
      self.sendAction( 'gotoediting' );
      console.log('hiii');
    }
  }
});

