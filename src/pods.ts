/**
 * Adapts import.meta.glob pods' to the standard format for the strict resolver
 *
 * e.g.:
 *
 * ```js
 * modules = {
 *   ...import.meta.glob('./services/*', { eager: true }),
 *   ...pods({
 *     ...import.meta.glob('./my-pods-prefix/**\/{route,template,controller}.{js,ts,gjs,gts}, { eager: true })
 *   }),
 * }
 * ```
 */
export function pods(
  podModulePrefix: string,
  modules: Record<string, unknown>,
) {}
