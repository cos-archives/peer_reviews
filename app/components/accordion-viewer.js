import Ember from 'ember';

export default Ember.Component.extend({
didRender(){
  console.log("gey");
  $(".accordion-content").hide();
  $(".accordion-button").eq(1).toggleClass("accordion-panel-active");
  $(".accordion-content").eq(1).show();
  $(".accordion").eq(0).toggleClass("active");
  $(".accordion-panel").eq(0).toggleClass("show");



},
  actions: {
    accordion(){
      var accordion = $(".accordion");
      var i = 0;
      for (i = 0; i < accordion.length; i++) {;
        accordion[i].onclick = function(){
            this.classList.toggle("active");
            this.nextElementSibling.classList.toggle("show");
      }
     }
    },
    accordionContent(){
     var i = 0;
     for (i = 0; i <= $(".accordion-button").length; i++) {
          $(".accordion-button").eq(i).removeClass("accordion-panel-active");
          $(".accordion-content").eq(i).hide();

          if(i == $(event.target).index()){
            $(".accordion-button").eq(i).toggleClass("accordion-panel-active");
            $(".accordion-content").eq(i).show();

          }

    }


  }
 }
});
