import Ember from "ember";

//get the reviewer id pf current user, if she has a reviewer account.
export function reviewerinfo() {
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
    } );
    return rid;
}
export default Ember.Helper.helper( reviewerinfo );
