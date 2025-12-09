import EmberApplication from '@ember/application';
import { StrictResolver } from './strict-resolver.ts';

export default class EmberApp extends EmberApplication {
  Resolver = {
    create: ({
      namespace,
    }: {
      namespace: {
        modules: Record<string, unknown>;
        plurals?: Record<string, string>;
      };
    }) => {
      const resolver = new StrictResolver(namespace.modules, namespace.plurals);

      return resolver;
    },
  };

  /**
    Set this to opt-in to using a strict resolver that will only return the
    given set of ES modules. The names of the modules should all be relative to
    the root of the app and start with "./"
    @property modules
    @public
  */
  declare modules?: {
    [modulePath: string]: unknown;
  };

  // TODO: I don't think I really want to add this, but I also don't want to
  // keep legacy pluralization baked in.
  declare plurals?: Record<string, string>;
}
