// Code Description:
// =================

// variables:
//---------------------
//reviewsall: all submissions to be reviewed
//reviewerall: all reviewers records stored in django db.
//reviewsdate: all submissions sorted by review deadline.





import Ember from "ember";
export default Ember.Route.extend( {
    queryParams: { isauthenticated: false }, isauthenticated: false, statusc: 0, mylist: null,
    model(){
        return Ember.RSVP.hash( {
            reviewsall: this.store.findAll( 'submission' ),
            reviewerall: this.store.findAll( 'reviewer' ),

            reviewsdate: this.store.findAll( 'submission', { reload: true } ).then( function ( reviewslist ) {
                return reviewslist.sortBy( 'reviewdeadline' ).reverse();
            } ),
          
            //number of all submissions related to this user as editor. 
            nlength: this.store.findAll( 'submission', { reload: true } ).then( function ( reviewslist ) {
                return reviewslist.get( 'length' );
            } ),
          
            //count of submissions at each state.
            ncomplete: this.store.findAll( 'submission', { reload: true } ).then( function ( reviewslist ) {
                return reviewslist.filterBy( 'status', 'Completed' )
                    .get( 'length' ) / reviewslist.get( 'length' ) * 100;
            } ),
            nawaitingr: this.store.findAll( 'submission', { reload: true } ).then( function ( reviewslist ) {
                return reviewslist.filterBy( 'status', 'Awaiting review' )
                    .get( 'length' ) / reviewslist.get( 'length' ) * 100;
            } ),
            nreview: this.store.findAll( 'submission', { reload: true } ).then( function ( reviewslist ) {
                return reviewslist.filterBy( 'status', 'Under review' )
                    .get( 'length' ) / reviewslist.get( 'length' ) * 100;
            } ),
            nawaitingd: this.store.findAll( 'submission', { reload: true } ).then( function ( reviewslist ) {
                return reviewslist.filterBy( 'status', 'Awaiting decision' )
                    .get( 'length' ) / reviewslist.get( 'length' ) * 100;
            } ),
            nreceived: this.store.findAll( 'submission', { reload: true } ).then( function ( reviewslist ) {
                return reviewslist.filterBy( 'status', 'Received' ).get( 'length' ) / reviewslist.get( 'length' ) * 100;
            } )
        } );
    },
    activate: function () {
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
        navigate() {
            this.transitionTo( 'index' );
        },
        gotoreviewing(){
            this.transitionTo( 'reviewslist' );
        },
        gotoediting(){
            this.transitionTo( 'editing.submissions' );
        },
        
        treeEvent(){ //this action is not used now but might be needed for future use to handle tree view
            console.log( this.get( 'conferences' ) );
            Ember.$( '.tree li:has(ul)' ).addClass( 'parent_li' ).find( ' > span' )
            .attr( 'title', 'Collapse this branch' );
            Ember.$( '.tree li.parent_li > span' ).on( 'click', function ( e ) {
                var children = Ember.$( this ).parent( 'li.parent_li' ).find( ' > ul > li' );
                if ( children.is( ":visible" ) ) {
                    children.hide( 'fast' );
                    Ember.$( this ).attr( 'title', 'Expand this branch' ).find( ' > i' ).addClass( 'icon-plus-sign' )
                    .removeClass( 'icon-minus-sign' );
                }
                else {
                    children.show( 'fast' );
                    Ember.$( this ).attr( 'title', 'Collapse this branch' ).find( ' > i' ).addClass( 'icon-minus-sign' )
                    .removeClass( 'icon-plus-sign' );
                }
                e.stopPropagation();
            } );
        }, filterdata(){
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
        }, dateColor( d ){ //this action is not used now, but needed for future use.
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
            var timeDiff = (date2.getTime() - today.getTime());
            var diffDays = Math.ceil( timeDiff / (1000 * 3600 * 24) );
            if ( diffDays >= 0 ) {
                this.set( 'statusc', this.get( 'statusc' ) + 1 );
            }
            else {
                this.set( 'statusc', this.get( 'statusc' ) + 0 );
            }
        }, goToSubmission( id ){
            console.log( id );
        }, showlist(){
            Ember.$( ".listViewHolder" ).show();
            Ember.$( ".listGridHolder" ).hide();
        }, showgrid(){
            Ember.$( ".listViewHolder" ).hide();
            Ember.$( ".listGridHolder" ).show();
        }
    }
} );
