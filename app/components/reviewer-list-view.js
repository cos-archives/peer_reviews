import Ember from 'ember';

export default Ember.Component.extend({
  actions:{
    storereviewerInfo(id){

      this.sendAction('storereviewerInfo',id);


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

