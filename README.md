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

  class TestApp extends EmberApp {
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


## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
