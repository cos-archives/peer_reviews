import Ember from 'ember';
export default Ember.Component.extend({
  didRender(){
  Ember.$(".ptitle h1").text(this.get('title'));
   if(this.get('filter') === false){
      Ember.$(".filter-control-holder").hide();
    }
  },
  actions: {
  filterdata(){
  this.sendAction("filterdata");
  this.sendAction('filterdata');

  }
}
});
