import Ember from "ember";
//an attempt to avoid a warning message by ember when specifying style in templates.
export function safeEmberstyle( params ) {
    var x = "background-color:" + params[ 0 ] + "; width:" + params[ 1 ] + "%";
    return new Ember.Handlebars.SafeString( x );
}
export default Ember.Helper.helper( safeEmberstyle );
