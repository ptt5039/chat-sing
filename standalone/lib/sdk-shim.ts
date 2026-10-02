// Standalone replacement for `@hatch/space-sdk` (server side).
// The app's `server/src/actions.ts` was written against the Muse hosting
// runtime. This shim provides the same runtime shapes so the unmodified
// action module can run under plain Bun.

import { z } from "zod";

export { z };

export const ACTION_BRAND = "@hatch/space-sdk/action/v1";
export const PRIVILEGED_CONTRACT_BRAND =
  "@hatch/space-sdk/privileged-contract/v1";
export const PRIVILEGED_HANDLERS_FORMAT =
  "@hatch/space-sdk/privileged-handlers/v1";

export interface ActionDefinition {
  readonly __brand: typeof ACTION_BRAND;
  readonly request: z.ZodType;
  readonly response: z.ZodType;
  readonly privileged?: readonly unknown[];
  readonly handler: (ctx: any, args: any) => Promise<any>;
}

export function defineAction(spec: {
  request: z.ZodType;
  response: z.ZodType;
  privileged?: readonly unknown[];
  handler: (ctx: any, args: any) => Promise<any>;
}): ActionDefinition {
  return { __brand: ACTION_BRAND, ...spec };
}

export function isAction(value: unknown): value is ActionDefinition {
  return (
    typeof value === "object" &&
    value !== null &&
    (value as any).__brand === ACTION_BRAND
  );
}

export interface PrivilegedContract {
  readonly __brand: typeof PRIVILEGED_CONTRACT_BRAND;
  readonly name: string;
  readonly request: z.ZodType;
  readonly response: z.ZodType;
}

export function definePrivilegedContracts(
  specs: Record<string, { request: z.ZodType; response: z.ZodType }>
): Record<string, PrivilegedContract> {
  const contracts: Record<string, PrivilegedContract> = {};
  for (const [name, spec] of Object.entries(specs)) {
    contracts[name] = {
      __brand: PRIVILEGED_CONTRACT_BRAND,
      name,
      request: spec.request,
      response: spec.response,
    };
  }
  return contracts;
}

export function isPrivilegedContract(value: unknown): value is PrivilegedContract {
  return (
    typeof value === "object" &&
    value !== null &&
    (value as any).__brand === PRIVILEGED_CONTRACT_BRAND
  );
}

export function definePrivilegedHandlers(
  contracts: Record<string, PrivilegedContract>,
  handlers: Record<string, (args: any) => Promise<any>>
): { format: string; entries: { contract: PrivilegedContract; handler: (args: any) => Promise<any> }[] } {
  const entries = [];
  for (const [key, handler] of Object.entries(handlers)) {
    if (handler === undefined) continue;
    const contract = contracts[key];
    if (!isPrivilegedContract(contract)) {
      throw new Error(`privileged handler '${key}' does not have a contract descriptor`);
    }
    entries.push({ contract, handler });
  }
  return { format: PRIVILEGED_HANDLERS_FORMAT, entries };
}

// Minimal types so `import { type ActionsModule, type Ctx } from "@hatch/space-sdk"`
// keeps typechecking in editors. The standalone server builds its own Ctx.
export type ActionsModule = Record<string, ActionDefinition>;
export type Ctx = any;
export type JsonValue = any;
