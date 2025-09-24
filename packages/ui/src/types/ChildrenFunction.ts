import type { ReactNode } from 'react';

export type ChildrenFunction<TProps> = (props: TProps) => ReactNode;
