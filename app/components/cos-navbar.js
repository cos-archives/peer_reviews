import Ember from "ember";
export default Ember.Component.extend( {
    username: null,
    profile_url: null,
    activate: function () {
        var self = this;
        Ember.$.ajax( {
            url: "http://localhost:8000/username",
            dataType: 'json',
            contentType: 'text/plain',
            xhrFields: {
                withCredentials: true
            }
        } ).then( function ( resp ) {
            if ( resp.data === 'false' ) {
                console.log( 'not logged in' );
            }
            else {
                self.set( 'username', resp.data );
                self.set( 'profile_url', "https://staging.osf.io/" + self.get( 'username' ) + "/" );
                //console.log(self.get('profile_url'));
            }
        } );
    }.on( "init" ),
    actions: {
        sendLogout() {
            var self = this;
            Ember.$.ajax( {
                url: "http://localhost:8000/api/userlogout",
                dataType: 'json',
                contentType: 'text/plain',
                xhrFields: {
                    withCredentials: true
                }
            } ).then( function ( response ) {
                if ( response.data === 'false' ) {
                    console.log( 'not logged in' );
                }
                else {
                    self.sendAction( 'navigate' );
                }
            } );
        },
        gotoreviewing() {
            var self = this;
            self.sendAction( 'gotoreviewing' );
        },
        gotoediting() {
            var self = this;
            self.sendAction( 'gotoediting' );
        }
    }
} );
