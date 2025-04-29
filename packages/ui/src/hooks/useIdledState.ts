import { useCallback, useRef, useState } from 'react';

type UseIdleHookType<T> = [T, (value: T) => void, (value: T) => void];

export const useIdledState = <T>(value: T, msDelay: number): UseIdleHookType<T> => {
	const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
	const [idledValue, setIdledValue] = useState<T>(value);

	const setIdled = useCallback(
		(value: T): void => {
			timeoutRef.current = setTimeout(() => setIdledValue(value), msDelay);
		},
		[setIdledValue, msDelay],
	);

	const clearIdled = useCallback(
		(value: T): void => {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = undefined;

			setIdledValue(value);
		},
		[setIdledValue],
	);

	return [idledValue, setIdled, clearIdled] as const;
};
