import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import compatModules from '@embroider/virtual/compat-modules';

import { compatToRFC1132 } from 'ember-strict-application-resolver/convert';

module('compatToRFC1132', function (hooks) {
  setupTest(hooks);

  test('it works', function (assert) {
    const result = compatToRFC1132('v2-addon', compatModules);

    assert.deepEqual(Object.keys(result), [
      // This lookup comes from package.json#exports
      './index',
      // From ember-page-title (in devDependencies)
      './services/page-title',
    ]);
  });

  test('modulePrefix likely incorrect (or util not needed)', function (assert) {
    assert.throws(() => {
      compatToRFC1132('test-app', compatModules);
    }, /These candidates exist: v2-addon/);
  });
});
