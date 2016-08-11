//import OsfAdapter from './osf-adapter';
import JSONAPIAdapter from 'ember-data/adapters/json-api';
import Ember from 'ember';

export default JSONAPIAdapter.extend({

    // namespace: 'api',
    host: 'http://localhost:8000',
    buildURL() {

    var url = this._super(...arguments);


    if (url.lastIndexOf('/') !== url.length - 1) {
      url += '/';
    }
    return url;
  }, ajax: function(url, method, hash) {
    hash.crossDomain = true;
    hash.xhrFields = {withCredentials: true};
    return this._super(url, method, hash);
  },
   headers: Ember.computed(function() {
    var csrftoken = "";
    try {
       csrftoken = Ember.get(document.cookie.match(/csrftoken\=([^;]*)/), "1");
    } catch(e){
      console.log(e);
      console.log('no csrftoken present');
    }

    return {
      "X-CSRFToken": csrftoken
    };
  }).volatile()
});
