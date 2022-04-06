import { useEffect } from 'react';

/**
 * Ensures:
 * - `task` is only run on mount
 * - the cleanup function returned by the `task` is only run on unmount
 * @param {Function} task - The task to execute once
 * */
export const useOnMount = (task: () => () => void): void =>
    useEffect(() => task(), []);
