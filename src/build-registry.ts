const DEFAULT_NAMESPACE = './';

/**
 * For libraries to provide a registry to use in apps.
 */
export function buildRegistry(entries: Record<string, unknown>) {
  /**
   * Injest a sub-registry from a library
   *
   * ```js
   * import EmberApp from 'ember-strict-application-resolver';
   *
   * import { libraryRegistry } from 'some-library/registry';
   *
   * class TestApp extends EmberApp {
   *   modules = {
   *     './router': { default: Router },
   *     ...libraryRegistry(),
   *   };
   * }
   * ```
   *
   * Or if using `ember-resolver`
   * ```js
   *   import Application from '@ember/application';
   *   import Resolver from 'ember-resolver';
   *   import config from '#config';
   *
   *   import { registry } from './registry.ts';

   *   export default class App extends Application {
   *     modulePrefix = config.modulePrefix;
   *     Resolver = Resolver.withModules({
   *       ...libraryRegistry('my-app-name'),
   *     });
      }
   * ```
   */
  return function createRegistry(namespace = DEFAULT_NAMESPACE) {
    const result: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(entries)) {
      const entry =
        namespace === DEFAULT_NAMESPACE ? key : join(namespace, key);

      result[entry] = value;
    }

    return result;
  };
}

function join(namespace: string, key: string) {
  return `${namespace}/${key}`.replace('/./', '/');
}
