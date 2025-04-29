import type { ReactNode } from 'react';

export type ChildrenFunction<TContext> = (context: TContext) => ReactNode;
