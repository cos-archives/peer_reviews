import Ember from "ember";
import DS from "ember-data";
import attr from "ember-data/attr";
import { belongsTo } from "ember-data/relationships";
export default DS.Model.extend( {
    premise: attr( 'string' ),
    research: attr( 'string' ),
    style: attr( 'string' ),
    comment: attr( 'string' ),
    total: Ember.computed( 'premise', 'research', 'style', function () {
        return (parseInt( this.get( 'premise' ) || 0 )) + (parseInt( this.get( 'research' ) || 0 )) + (parseInt( this.get( 'style' ) ) || 0);
    } ),
    reviewer: belongsTo( 'reviewer' ),
    submission: belongsTo( 'submission' ),
} );
