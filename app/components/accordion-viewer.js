import Ember from 'ember';

export default Ember.Component.extend({
  queryParams: { submission_id: null },
    model(){
        return Ember.RSVP.hash( {
            reviewerall: this.store.findAll( 'reviewer' ),
            reviewername: this.store.findAll( 'reviewer', { reload: true } ).then( function ( reviewer ) {
                return reviewer.sortBy( 'name' );
            } ),
            revieweremail: this.store.findAll( 'reviewer', { reload: true } ).then( function ( reviewer ) {
                return reviewer.sortBy( 'email' );
            } )
        } );
    },

didRender(){

},
  actions: {
          navigate() {
            this.transitionTo( 'index' );
        },
      gotoreviewing(){
        this.transitionTo( 'reviewslist' );
      },
      gotoediting(){
        this.transitionTo( 'peerdashboard' );
      },
        filterdata(){
            Ember.$( '#filter' ).keyup( function () {
                var rex = new RegExp( Ember.$( this ).val(), 'i' );
                Ember.$( '.searchable tr' ).hide();
                Ember.$( '.searchable tr' ).filter( function () {
                    return rex.test( Ember.$( this ).text() );
                } ).show();
            } );
        }
 }
});
