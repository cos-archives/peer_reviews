import Ember from "ember";
export default Ember.Controller.extend( {
    isshowingInvite: false,
    isshowingBio: false,
    ptitle: null,
    cname: null,
    reviewerInfo: '',
    msgtemplate: 'Dear {rname},\n\n' +
    'I am writing to invite you to review a manuscript for {cname} entitled {ptitle}.\n' +
    'If you accept this assignment, you are confirming that you have no competing interests that may affect your ability to provide an objective evaluation. Our Competing Interests policy can be found at here.\n' +
    'By agreeing to review, you are also committing to a confidential review process.\n' +
    'Please do not share this manuscript with anyone who is not directly involved in the review process, including colleagues and other experts in the field.\n' +
    'Reviewers may not share or act upon any confidential information gained in the review process.\n' +
    'The new manuscript will be shown in your reviews list at OSF Peer Reviews ({osfp}). You can accept or decline the review using the accept/decline buttons in front of the manuscript.\n' +
    'I would appreciate receiving your review within 7 calendar days of your acceptance.\n' +
    'If you have any questions or concerns, please contact us at reviews@osf.io\n\n' +
    'Academic Editor',
    emailbody: '',
    // store: Ember.inject.service('store'),
    actions: {
        sendemail(){
            var self = this;

            let ev = self.store.createRecord( 'evaluation' );
            var subId = self.get( 'submission_id' );

            self.store.findRecord( 'submission', subId )
            .then( function (x) {
                ev.set('submission', x );
                var revId = self.get( 'reviewerInfo.id' );
                return self.store.findRecord( 'reviewer', revId );
            } )
            .then( function ( y ) {
                ev.set( 'status', 'assigned' );
                ev.set( 'reviewer', y );
            } )
            .then( function () {
                ev.save();
            } )
            .then( function () {
                self.set( 'isshowingInvite', false );
                document.getElementById( 'submitAlert' ).className = "alert-success alert fade in";
                setTimeout( function () {
                    self.transitionToRoute( 'peerdashboard' );
                }, 2000 );
                let emailrecord = self.store.createRecord( 'email' );
                emailrecord.from_email = 'sherif_hany@hotmail.com';
                emailrecord.to_email = 'sherief@vbi.vt.edu';
                emailrecord.message = self.get( 'emailbody' );
                emailrecord.subject = 'Review Invitation';
                emailrecord.save();
            }, function () {
                self.set( 'isshowingInvite', false );
                document.getElementById( 'submitAlert2' ).className = "alert-danger alert fade in";
                setTimeout( function () {
                    Ember.$( '#submitAlert2' ).hide();
                }, 2000 );
            } );
        },
        showdata2( name ){
            var self = this;
            self.store.findAll( 'submission', { reload: true } ).then( function ( response ) {
                //console.log( self.get( 'submission_id' ) );
                let tyrion = response.filterBy( 'id', self.get( 'submission_id' ) );
                //console.log( tyrion[ 0 ].get( 'data' ) );
                self.set( 'ptitle', tyrion[ 0 ].get( 'title' ) );
                self.set( 'cname', tyrion[ 0 ].get( 'conference' ) );
                self.set( 'isshowingInvite', true );
                //self.set( 'emailbody', self.get( 'msgtemplate' ) );
                self.set( 'emailbody', self.get( 'msgtemplate' ).replace( "{cname}", self.get( 'cname' ) )
                .replace( '{ptitle}', self.get( 'ptitle' ) ).replace( '{rname}', name )
                .replace( '{osfp}', "http://localhost:4200/reviewslist/" ));
                console.log(self.get('emailbody'));
                //self.set( 'emailbody', self.get('emailbody'));
            } );
        },
        showdata( name ) {
            var self = this;
            this.store.findRecord( 'reviewslist', this.get( 'submission_id' ) ).then( function ( response ) {
                self.set( 'ptitle', response.get( 'title' ) );
                self.set( 'cname', response.get( 'conference' ) );
                self.set( 'isshowingInvite', true );
                self.set( 'emailbody', self.get( 'msgtemplate' ) );
                var str = "OSF Peer Reviews";
                self.set( 'emailbody', self.get( 'msgtemplate' ).replace( "{cname}", self.get( 'cname' ) )
                .replace( '{ptitle}', self.get( 'ptitle' ) ).replace( '{rname}', name )
                .replace( '{osfp}', str.link( "http://localhost:4200/reviewslist/" ) ) );
            } );
        },
        hidedata()  {
            this.set( 'isshowingInvite', false );
        },
        gotodashboard(){
            this.transitionToRoute( 'peerdashboard' );
        },
        storereviewerInfo( id ){
            this.set( 'isshowingBio', true );
            this.set( 'reviewerInfo', this.store.findRecord( 'reviewer', id ) );
        }
    }
} );


// =======
//     'I am writing to invite you to review a manuscript for {cname} entitled {ptitle}.\n'+
//     'If you accept this assignment, you are confirming that you have no competing interests that may affect your ability to provide an objective evaluation. Our Competing Interests policy can be found at here.\n'+
//     'By agreeing to review, you are also committing to a confidential review process.\n'+
//     'Please do not share this manuscript with anyone who is not directly involved in the review process, including colleagues and other experts in the field.\n'+
//     'Reviewers may not share or act upon any confidential information gained in the review process.\n'+
//     'The new manuscript will be shown in your reviews list at OSF Peer Reviews ({osfp}). You can accept or decline the review using the accept/decline buttons in front of the manuscript.\n' +
//     'I would appreciate receiving your review within 7 calendar days of your acceptance.\n'+
//     'If you have any questions or concerns, please contact us at reviews@osf.io\n\n'+
//      'Academic Editor',
