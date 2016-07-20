//import OsfAdapter from './osf-adapter';
import JSONAPIAdapter from 'ember-data/adapters/json-api';

export default JSONAPIAdapter.extend({

    namespace: 'api',
    host: 'http://localhost:8000',
    buildURL() {

    var url = this._super(...arguments);


    if (url.lastIndexOf('/') !== url.length - 1) {
      url += '/';
    }
    return url;
  },
});
