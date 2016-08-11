import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('reviewer-bio', 'Integration | Component | reviewer bio', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{reviewer-bio}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#reviewer-bio}}
      template block text
    {{/reviewer-bio}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
