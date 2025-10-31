import type { Factory, Resolver } from '@ember/owner';
export declare class StrictResolver implements Resolver {
    #private;
    original: any;
    constructor(modules: Record<string, Record<string, unknown>>, plurals?: Record<string, string> | undefined);
    addModules(modules: Record<string, Record<string, unknown>>): void;
    resolve(fullName: string): Factory<object> | object | undefined;
    normalize(fullName: `${string}:${string}`): `${string}:${string}`;
}
//# sourceMappingURL=strict-resolver.d.ts.map