import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  submission: attr('string'),
  reviewer: attr('string'),
  status: attr('string')

});

