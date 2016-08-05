import Ember from "ember";
export default Ember.Route.extend( {
    statusc: 0, model(){
        return Ember.RSVP.hash( {
            reviewsall: this.store.findAll( 'submission' ),
            reviewsdate: this.store.findAll( 'submission', { reload: true } ).then( function ( reviewslist ) {
                return reviewslist.sortBy( 'reviewdeadline' ).reverse();
            } ),
            reviewsfilter: this.store.findAll( 'submission', { reload: true } ).then( function ( reviewslist ) {
                return reviewslist.filterBy( 'status', 'Completed' ).get( 'length' );
            } )
        } );
    }, activate: function () {
        var self = this;
        Ember.$.ajax( {
            url: "http://localhost:8000/checklogin", dataType: 'json', contentType: 'text/plain', xhrFields: {
                withCredentials: true
            }
        } ).then( function ( loggedIn ) {
            if ( loggedIn.data === 'false' ) {
                console.log( 'not logged in' );
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
            this.transitionTo( 'peerdashboard' );
        },
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
        }, dateColor( d ){
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1;
            var yyyy = today.getFullYear();
            if ( dd < 10 ) {
                dd = '0' + dd;
            }
            if ( mm < 10 ) {
                mm = '0' + mm;
            }
            today = new Date( mm + '/' + dd + '/' + yyyy );
            var date2 = new Date( d );
            var timeDiff = ( date2.getTime() - today.getTime() );
            var diffDays = Math.ceil( timeDiff / (1000 * 3600 * 24) );
            if ( diffDays >= 0 ) {
                this.set( 'statusc', this.get( 'statusc' ) + 1 );
            }
            else {
                this.set( 'statusc', this.get( 'statusc' ) + 0 );
            }
            console.log( this.get( 'statusc' ) );
        }
    }
} );
