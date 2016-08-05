import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('reviewer-list-view', 'Integration | Component | reviewer list view', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{reviewer-list-view}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#reviewer-list-view}}
      template block text
    {{/reviewer-list-view}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
