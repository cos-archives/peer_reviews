import Ember from "ember";
export function navigateNavbar( params ) {
    var x = params[ 0 ];
    console.log( x );
    if ( x === 'reviews' ) {


        //return "/reviewslist";
    }
    else {
        return "/peerdashboard";
    }
}
export default Ember.Helper.helper( navigateNavbar );
