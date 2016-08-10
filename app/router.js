import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('evaluation');
  this.route('evalConfirmation');
  this.route('assignreview');
  this.route('reviewslist');
  this.route('peerdashboard', function() {});

  //replacement for peerdashboard
  this.route('editing', function() {
      this.route('submission', { path: '/submission/:submission_id' });
      this.route('submissions');
  });
});

export default Router;
