import Ember from "ember";
export default Ember.Route.extend( {
    model(params){
        return Ember.RSVP.hash( {
            allReviewers: this.store.findAll( 'reviewer' ),
            thisSubmission: this.store.findRecord( 'submission', params.submission_id)
         } );

    },
     didRender() {
      this._super(...arguments);
      console.log("Path Name" , window.location.pathname);
    }
} );
