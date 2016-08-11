import Ember from "ember";
export default Ember.Route.extend( {
    model(){
        return Ember.RSVP.hash( {
            //return all reviews assigned to current user sorted by review date
            reviewsdate: this.store.findAll( 'review', { reload: true } ).then( function ( reviewslist ) {
                return reviewslist.sortBy( 'reviewdeadline' ).reverse();
            } )
        } );
    }, activate: function () {
         //check if current user is logged in, otherwise forward to login page
        var self = this;
        Ember.$.ajax( {
            url: "http://localhost:8000/checklogin", dataType: 'json', contentType: 'text/plain', xhrFields: {
                withCredentials: true
            }
        } ).then( function ( loggedIn ) {
            if ( loggedIn.data === 'false' ) {

                self.transitionTo( 'login' );
            }
        } );
    },
    actions: {

        openreview() {
            this.transitionToRoute( 'evaluation' );
        },
        navigate() {
            this.transitionTo( 'index' );
        },
        gotoreviewing(){
            this.transitionTo( 'reviewslist' );
        },
        gotoediting(){
         this.transitionTo('editing.submissions');

        },
        //handle filter search
        filterdata(){
            Ember.$( '#filter' ).keyup( function () {
                var rex = new RegExp( Ember.$( this ).val(), 'i' );
                Ember.$( '.searchable tr' ).hide();
                Ember.$( '.searchable2' ).hide();
                Ember.$( '.searchable tr' ).filter( function () {
                    return rex.test( Ember.$( this ).text() );
                } ).show();
                Ember.$( '.searchable2' ).filter( function () {
                    return rex.test( Ember.$( this ).text() );
                } ).show();
            } );
        }
    }
} );
