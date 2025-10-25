import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { compatToRFC1132 } from '#src/convert.ts';

module('compatToRFC1132', function (hooks) {
  setupTest(hooks);

  test('it works', function (assert) {
    const result = compatToRFC1132('test-app', {
      'test-app/services/page-title': {},
    });

    assert.deepEqual(Object.keys(result), [
      // From ember-page-title (in devDependencies)
      './services/page-title',
    ]);
  });

  test('modulePrefix likely incorrect (or util not needed)', function (assert) {
    assert.throws(() => {
      compatToRFC1132('test-app', { 'other-thing': {}, 'top-level': {} });
    }, /These candidates exist: other-thing, top-level/);
  });
});
