import type { Children } from './Children.js';
import type { ChildrenFunction } from './ChildrenFunction.js';

export type CustomChildren<TChildrenFunctionProps> =
	| Children
	| ChildrenFunction<TChildrenFunctionProps>;
