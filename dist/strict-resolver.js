
class StrictResolver {
  #modules = new Map();
  #plurals = new Map();
  original;
  constructor(modules, plurals = undefined) {
    this.addModules(modules);
    this.#plurals.set('config', 'config');
    if (plurals) {
      for (const [singular, plural] of Object.entries(plurals)) {
        this.#plurals.set(singular, plural);
      }
    }
  }
  addModules(modules) {
    for (const [moduleName, module] of Object.entries(modules)) {
      this.#modules.set(this.#normalizeModule(moduleName), module);
    }
  }
  #normalizeModule(moduleName) {
    return moduleName.replace(fileExtension, '').replace(leadingDotSlash, '');
  }
  #plural(s) {
    return this.#plurals.get(s) ?? s + 's';
  }
  resolve(fullName) {
    // eslint-disable-next-line prefer-const
    let [type, name] = fullName.split(':');
    name = this.#normalizeName(type, name);
    for (const strategy of [this.#resolveSelf, this.#mainLookup, this.#defaultLookup]) {
      const result = strategy.call(this, type, name);
      if (result) {
        return this.#extractDefaultExport(result.hit);
      }
    }
    return undefined;
  }
  #extractDefaultExport(module) {
    if (module && module['default']) {
      module = module['default'];
    }
    return module;
  }
  normalize(fullName) {
    // eslint-disable-next-line prefer-const
    let [type, name] = fullName.split(':');
    name = this.#normalizeName(type, name);
    return `${type}:${name}`;
  }
  #normalizeName(type, name) {
    if (type === 'component' || type === 'helper' || type === 'modifier' || type === 'template' && name.indexOf('components/') === 0) {
      return name.replace(/_/g, '-');
    } else {
      return dasherize(name.replace(/\./g, '/'));
    }
  }
  #resolveSelf(type, name) {
    if (type === 'resolver' && name === 'current') {
      return {
        hit: {
          create: () => this
        }
      };
    }
    return undefined;
  }
  #mainLookup(type, name) {
    if (name === 'main') {
      const module = this.#modules.get(type);
      if (module) {
        return {
          hit: module
        };
      }
    }
    return undefined;
  }
  #defaultLookup(type, name) {
    const dir = this.#plural(type);
    const target = `${dir}/${name}`;
    const module = this.#modules.get(target);
    if (module) {
      return {
        hit: module
      };
    }
    return undefined;
  }
}
const fileExtension = /\.\w{1,4}$/;
const leadingDotSlash = /^\.\//;
const STRING_DECAMELIZE_REGEXP = /([a-z\d])([A-Z])/g;
function decamelize(str) {
  return str.replace(STRING_DECAMELIZE_REGEXP, '$1_$2').toLowerCase();
}
const STRING_DASHERIZE_REGEXP = /[ _]/g;
function dasherize(key) {
  return decamelize(key).replace(STRING_DASHERIZE_REGEXP, '-');
}

export { StrictResolver };
//# sourceMappingURL=strict-resolver.js.map
