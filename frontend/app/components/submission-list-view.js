import Ember from "ember";
export default Ember.Component.extend( {
    actions: {
        goToSubmission( id ){
            this.sendAction( 'goToSubmission', id );
        }
    }
} );
