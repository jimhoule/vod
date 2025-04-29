import type { HTMLAttributes } from 'react';

export type ChildlessHtmlAttributes<THtmlElement> = Omit<HTMLAttributes<THtmlElement>, 'children'>;
