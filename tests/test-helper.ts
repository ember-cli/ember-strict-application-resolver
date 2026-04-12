import EmberApp from '#src/index.ts';
import Service from '@ember/service';
import EmberRouter from '@ember/routing/router';
import Component from '@glimmer/component';
import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start as qunitStart, setupEmberOnerrorValidation } from 'ember-qunit';

class Manual extends Service {
  weDidIt = true;
}

class Router extends EmberRouter {
  location = 'none';
  rootURL = '/';
}
// eslint-disable-next-line ember/no-empty-glimmer-component-classes
class ApplicationLoadingComponent extends Component {}
// eslint-disable-next-line ember/no-empty-glimmer-component-classes
class ApplicationErrorComponent extends Component {}

class TestApp extends EmberApp {
  modules = {
    './router': { default: Router },
    './services/manual': { default: Manual },
    './services/manual-shorthand': Manual,
    './templates/application_loading': ApplicationLoadingComponent,
    './templates/application_error': ApplicationErrorComponent,
    ...import.meta.glob('./services/*', { eager: true }),
  };
}

Router.map(function () {});

export function start() {
  setApplication(
    TestApp.create({
      autoboot: false,
      rootElement: '#ember-testing',
    }),
  );
  setup(QUnit.assert);
  setupEmberOnerrorValidation();
  qunitStart();
}
