import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    openreview(){
      this.sendAction('openreview');
    },
    decidesubmission(id,title,decision){
      this.sendAction('decidesubmission',id,title,decision);
    }

  }
});
