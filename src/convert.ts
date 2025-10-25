import { assert } from '@ember/debug';
import type { ModuleEntries } from './types.ts';

export function compatToRFC1132(modulePrefix: string, modules: ModuleEntries) {
  const result: ModuleEntries = {};

  let madeReplacements = false;
  for (const [key, module] of Object.entries(modules)) {
    const newKey = key.replace(new RegExp(`^${modulePrefix}/`), './');

    if (!madeReplacements) {
      if (key !== newKey) {
        madeReplacements = true;
      }
    }

    result[newKey] = module;
  }

  assert(
    `No replacements were made. Is the ${modulePrefix} correct? These candidates exist: ${[
      ...new Set<string>(
        /**
         * 'full-name/foo' => 'full-name'
         */
        Object.keys(modules).map(
          (full) => full.split('/')[0] ?? '<could not detect>',
        ),
      ).values(),
    ].join(', ')}`,
    madeReplacements,
  );

  return result;
}
