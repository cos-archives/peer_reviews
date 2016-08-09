import Ember from 'ember';

export default Ember.Component.extend({



 didRender() {
    var sum = 0.0;
    this._super(...arguments);
    $('.total-score').each(function()
    {
      sum += +$(this).text();
    });
    $('.total-score-holder ').text(sum);

},
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

