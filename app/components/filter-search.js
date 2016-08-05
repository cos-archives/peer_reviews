import Ember from 'ember';

export default Ember.Component.extend({
  didRender(){
  Ember.$(".ptitle h1").text(this.get('title'));
  },
  actions: {
  filterdata(){
  this.sendAction("filterdata");
  this.sendAction('filterdata');

  }
}

});
