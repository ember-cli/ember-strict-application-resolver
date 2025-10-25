import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import compatModules from '@embroider/virtual/compat-modules';

import { compatToRFC1132 } from '#src/convert.ts';

module('compatToRFC1132', function (hooks) {
  setupTest(hooks);

  test('it works', function (assert) {
    const result = compatToRFC1132(
      'ember-strict-application-resolver',
      compatModules,
    );

    assert.deepEqual(Object.keys(result), [
      './build-registry',
      './convert',
      './index',
      './strict-resolver',
    ]);
  });

  test('modulePrefix likely incorrect (or util not needed)', function (assert) {
    assert.throws(() => {
      compatToRFC1132('test-app', compatModules);
    }, /These candidates exist: ember-strict-application-resolver/);
  });
});
