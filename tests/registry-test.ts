import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Registry', function (hooks) {
  setupTest(hooks);

  test('has the router', function (assert) {
    // eslint-disable-next-line ember/no-private-routing-service
    const router = this.owner.lookup('router:main');

    assert.ok(router);
  });

  test('has a manually registered service', function (assert) {
    const manual = this.owner.lookup('service:manual') as { weDidIt: boolean };

    assert.ok(manual);
    assert.ok(manual.weDidIt);
  });

  test('has a manually registered (shorthand) service', function (assert) {
    const manual = this.owner.lookup('service:manual-shorthand') as {
      weDidIt: boolean;
    };

    assert.ok(manual);
    assert.ok(manual.weDidIt);
  });

  test('has a service from import.meta.glob', function (assert) {
    const metaGlob = this.owner.lookup('service:from-meta-glob') as {
      weDidIt: boolean;
    };

    assert.ok(metaGlob);
    assert.ok(metaGlob.weDidIt);
  });

  test('registered stuff can be looked up', function (assert) {
    class Foo {
      static create() {
        return new this();
      }

      two = 2;
    }
    this.owner.register('not-standard:main', Foo);

    const value = this.owner.lookup('not-standard:main') as Foo;

    assert.strictEqual(value.two, 2);
  });

  test('has an application_loading substate template', function (assert) {
    // @ts-expect-error private API
    const instance = [...this.owner.application._applicationInstances][0];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    instance.setupRouter();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const routerHasRoute = instance.router.hasRoute('application_loading');
    const template = this.owner.factoryFor('template:application_loading');
    const route = this.owner.factoryFor('route:application_loading');

    assert.ok(routerHasRoute, 'router has route');
    assert.ok(template || route, 'has template or route');
  });

  test('has an application_error substate template', function (assert) {
    // @ts-expect-error private API
    const instance = [...this.owner.application._applicationInstances][0];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    instance.setupRouter();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const routerHasRoute = instance.router.hasRoute('application_error');
    const template = this.owner.factoryFor('template:application_error');
    const route = this.owner.factoryFor('route:application_error');

    assert.ok(routerHasRoute, 'router has route');
    assert.ok(template || route, 'has template or route');
  });
});
