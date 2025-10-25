export interface ModuleEntries {
  [modulePath: string]: {
    [exportName: string]: unknown;
  };
}
