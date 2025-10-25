import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Services', function (hooks) {
  setupTest(hooks);

  test('has the config', function (assert) {
    let entry = this.owner.resolveRegistration('config:environment');

    assert.ok(entry);
  });

  test('has the router', function (assert) {
    // eslint-disable-next-line ember/no-private-routing-service
    let entry = this.owner.lookup('router:main');

    assert.ok(entry);
  });

  test('has the application template', function (assert) {
    let entry = this.owner.hasRegistration('template:application');

    assert.ok(entry);
  });

  test('has services from addons', function (assert) {
    let pageTitle = this.owner.lookup('service:page-title');

    assert.ok(pageTitle, 'page title service found');
  });

  test('has own services', function (assert) {
    let foo = this.owner.lookup('service:foo');

    assert.strictEqual(foo.two, 2);
  });
});
