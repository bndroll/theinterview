import type { Context } from 'hono';
import type { BlankEnv, BlankInput } from 'hono/types';

export type HonoContext = Context<BlankEnv, '/', BlankInput>
