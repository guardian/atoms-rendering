import { useEffect } from 'react';

/**
 * Ensures:
 * - `task` is only run on mount
 * - the cleanup function returned by `task` is only run on unmount
 *
 * Any props or state used by `task` will have the values at the time of component mount.
 * Any re-renders with changed values will not cause task to rerun.
 *
 * Be careful that this is what you want!
 * @param {Function} task - The task to execute once
 * */
export const useOnMount = (task: () => () => void): void =>
    useEffect(() => task(), []);
