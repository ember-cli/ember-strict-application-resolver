import compatModules from '@embroider/virtual/compat-modules';
import loadInitializers from 'ember-load-initializers';
import config from 'vite-with-strict-app/config/environment';
import { importSync, isDevelopingApp, macroCondition } from '@embroider/macros';
import setupInspector from '@embroider/legacy-inspector-support/ember-source-4.12';
import EmberApp from 'ember-strict-application-resolver';
import { compatToRFC1132 } from 'ember-strict-application-resolver/convert';

if (macroCondition(isDevelopingApp())) {
  importSync('./deprecation-workflow');
}

export default class App extends EmberApp {
  modules = {
    ...compatToRFC1132('vite-with-strict-app', compatModules),
  };

  inspector = setupInspector(this);
}

loadInitializers(App, config.modulePrefix, compatModules);
