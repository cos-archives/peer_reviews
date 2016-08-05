import Ember from 'ember';

export default Ember.Component.extend({
  actions:{
    storereviewerInfo(id){

      this.sendAction('storereviewerInfo',id);


    }
  }
});
