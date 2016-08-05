import Ember from "ember";
export default Ember.Controller.extend( {
    islistview: true,
    isgridview: false,
    actions: {
        openreview( submission ) {
            this.transitionToRoute( 'evaluation', { queryParams: { sub: submission } } );
        },
        showlist(){
            this.set( 'islistview', true );
            this.set( 'isgridview', false );
        },
        showgrid(){
            this.set( 'islistview', false );
            this.set( 'isgridview', true );
        },
        acceptsubmission(){
        },
        storereviewerInfo( id ){
            this.set( 'isshowingBio', true );
            this.set( 'reviewerInfo', this.store.findRecord( 'reviewer', id ) );
        },
        decidesubmission( did, sname, status ){
            let self = this;
            var rid = null;
            Ember.$.ajax( {
                url: "http://localhost:8000/api/reviewerid",
                dataType: 'json',
                contentType: 'text/plain',
                xhrFields: {
                    withCredentials: true
                }
            } ).then( function ( response ) {
                rid = response.data[ 0 ].id;
                let assignrecord = self.store.createRecord( 'reviewerassignment' );
                assignrecord.submission = did;
                assignrecord.reviewer = rid;
                assignrecord.status = status;
                assignrecord.save();
            }, function ( response ) {
                self.set( 'emailbody', self.get( 'msgtemplate' ).replace( "{cname}", response.data[ 0 ].name )
                .replace( '{ptitle}', sname ) );
                let emailrecord = self.store.createRecord( 'email' );
                //using this email for testing
                emailrecord.from_email = 'sherif_hany@hotmail.com';
                emailrecord.to_email = 'sherief@vbi.vt.edu';
                emailrecord.message = self.get( 'emailbody' );
                emailrecord.subject = 'Review Invitation';
                emailrecord.save();
            } );
        }
    }
} );
