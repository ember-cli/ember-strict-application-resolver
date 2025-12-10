
import EmberApplication from '@ember/application';
import { StrictResolver } from './strict-resolver.js';

class EmberApp extends EmberApplication {
  Resolver = {
    create: ({
      namespace
    }) => {
      const resolver = new StrictResolver(namespace.modules, namespace.plurals);
      return resolver;
    }
  };

  /**
    Set this to opt-in to using a strict resolver that will only return the
    given set of ES modules. The names of the modules should all be relative to
    the root of the app and start with "./"
    @property modules
    @public
  */

  // TODO: I don't think I really want to add this, but I also don't want to
  // keep legacy pluralization baked in.
}

export { EmberApp as default };
//# sourceMappingURL=index.js.map
