import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    saveEvaluation(model){
      this.sendAction('saveEvaluation' , model);
    },
    cancel(){
      this.sendAction('cancel');
    }

  }
});
