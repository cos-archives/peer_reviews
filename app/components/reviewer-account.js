import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    saveEvaluation(model){
      this.sendAction('saveReviewer' , model);
    },
    cancel(){
      this.sendAction('cancel');
    }

  }
});
