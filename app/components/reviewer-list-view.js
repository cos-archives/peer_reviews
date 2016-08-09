import Ember from 'ember';

export default Ember.Component.extend({



 didRender() {
    this._super(...arguments);
    var sum = 0.0;
    var i = 0;
    $('.total-score').each(function()
    {
      i++;
      sum += +$(this).text();
    });
    sum = sum / i;
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

