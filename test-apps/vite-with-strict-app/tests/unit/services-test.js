import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Services', function (hooks) {
  setupTest(hooks);

  test('has services from addons', function (assert) {
    let pageTitle = this.owner.lookup('service:page-title');

    assert.ok(pageTitle, 'page title service found');
  });

  test('has own services', function (assert) {
    let foo = this.owner.lookup('service:foo');

    assert.strictEqual(foo.two, 2);
  });
});
