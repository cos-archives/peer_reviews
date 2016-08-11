import Ember from "ember";
export default Ember.Route.extend( {
    model(){
        return Ember.RSVP.hash( {
            //return all reviews assigned to current user sorted by review date
            submissions: this.store.findAll( 'submission', { reload: true } ).then( function ( reviewslist ) {
                return reviewslist.sortBy( 'reviewdeadline' ).reverse();
            } )
        } );

    },
    actions: {
        goToSubmission( id ){
            console.log( "called", id );
            this.transitionTo( 'editing.submission', id );
        }
    }
} );
