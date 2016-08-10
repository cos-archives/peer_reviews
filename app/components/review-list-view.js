import Ember from "ember";
export default Ember.Component.extend( {
    actions: {
        openreview() {
            this.sendAction( 'openreview' );
        },
        decidesubmission( id, title, decision ) {
            this.sendAction( 'decidesubmission', id, title, decision );
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
