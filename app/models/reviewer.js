import Model from "ember-data/model";
import attr from "ember-data/attr";
import { hasMany } from "ember-data/relationships";
export default Model.extend( {
    name: attr( 'string' ),
    email: attr( 'string' ),
    affiliation: attr( 'string' ),
    bio: attr( 'string' ),
    research: attr( 'string' ),
    osfreviews: attr( 'string' ),
    avatar: attr( 'string' ),
    website: attr( 'string' ),
    evaluations: hasMany( 'evaluation' ),
    reviewerassignments: hasMany( 'reviewerassignment' ),
} );
