import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { buildRegistry } from '#src/build-registry.ts';

module('buildRegistry', function (hooks) {
  setupTest(hooks);

  test('returns a function', function (assert) {
    const result = buildRegistry({});

    assert.strictEqual(typeof result, 'function');
  });

  test('has entries', function (assert) {
    const result = buildRegistry({
      './foo': 2,
    });

    assert.deepEqual(result(), { './foo': 2 });
  });

  test('entries can be prefixed', function (assert) {
    const result = buildRegistry({
      './foo': 2,
    });

    assert.deepEqual(result('test-app'), { 'test-app/foo': 2 });
  });

  test('entries can be prefixed with scope', function (assert) {
    const result = buildRegistry({
      './foo': 2,
    });

    assert.deepEqual(result('@scope/test-app'), { '@scope/test-app/foo': 2 });
  });
});
