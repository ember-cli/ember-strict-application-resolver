# ember-strict-application-resolver

A polyfill implementation of the upcoming default strict resolver built in to Ember.

## Installation

```
npm add ember-strict-application-resolver
```

## Usage

In your app.js or app.ts, or wherever you configure your application
```diff
- import config from '<app-name>/config/environment';
- import EmberApp from '@ember/application';
- import EmberResolver from 'ember-resolver';
+ import EmberApp from 'ember-strict-application-resolver';

  class YouApp extends EmberApp {
-   modulePrefix = config.modulePrefix;
-   podModulePrefix = config.podModulePrefix;
-   Resolver = EmberResolver.withModules({
-      [`${config.modulePrefix}/router`]: { default: Router },
-      [`${config.modulePrefix}/services/manual`]: { default: Manual },
-    });

+    modules = {
+      './router': { default: Router },
+      './services/manual': { default: SomeService },
+      './services/manual-shorthand': SomeOtherService,
+
+      // now import.meta.glob just works
+      ...import.meta.glob('./services/**/*', { eager: true }),
+      ...import.meta.glob('./routes/*', { eager: true }),
+      ...import.meta.glob('./templates/**/*', { eager: true }),
+    };
  }
```

The type of `modules` is:
```ts
{ 
  [modulePath: string]:
    | ExportableType
    | { [exportName: string]: ExportableType };
};
```

### `buildRegistry`

Libraries may declare `ember-strict-application-resolver` as a `dependencies` entry, and then import from `./build-registry` - to provide helpers for packages all the library's services and other things that need to be in the registry (such as from the library's dependencies as well)

For example:
```js
// in src/registry.ts (or js)
import { buildRegistry } from 'ember-strict-application-resolver/build-registry';
import TheService from 'from-dependency/services/the-service';

export default buildRegistry({
  ...import.meta.glob('./services/*', { eager: true }),
  './services/the-service': { default: TheService },
});
```

Then consumers of your library would either splat this into their `modules` object:
```js
import libraryRegistry from 'your-library/registry';
// ...

modules = {
  // if the app is using ember-strict-application-resolver
  ...libraryRegistry(),
  // or if using ember-resolver
  ...libraryRegistry('name-of-app'),
}
```

Or consuming libraries would propagate the configuration for their consumers:
```js
import { buildRegistry } from 'ember-strict-application-resolver/build-registry';
import libraryRegistry from 'your-library/registry';

export default buildRegistry({
  ...import.meta.glob('./services/*', { eager: true }),
  // No argument should be passed here
  ...libraryRegistry(),
});
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
