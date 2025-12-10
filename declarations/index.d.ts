import EmberApplication from '@ember/application';
import { StrictResolver } from './strict-resolver.ts';
export default class EmberApp extends EmberApplication {
    Resolver: {
        create: ({ namespace, }: {
            namespace: {
                modules: Record<string, unknown>;
                plurals?: Record<string, string>;
            };
        }) => StrictResolver;
    };
    /**
      Set this to opt-in to using a strict resolver that will only return the
      given set of ES modules. The names of the modules should all be relative to
      the root of the app and start with "./"
      @property modules
      @public
    */
    modules?: {
        [modulePath: string]: unknown;
    };
    plurals?: Record<string, string>;
}
//# sourceMappingURL=index.d.ts.map