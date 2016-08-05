import Ember from "ember";
export default Ember.Route.extend( {
    actions: {
        goToSubmission( id ){
            console.log( "called", id );
            this.transitionTo( 'editing.submission', id );
        }
    }
} );
