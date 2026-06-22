import { useState, useCallback, useRef } from "react";

/**
 * Custom hook to manage undo/redo history efficiently.
 * Optimized for state tracking in an editor environment.
 */
export function useHistory<T>(initialState: T, limit = 100) {
    const [state, setStateInternal] = useState<T>(initialState);
    const pastRef = useRef<T[]>([]);
    const futureRef = useRef<T[]>([]);
    const lastSavedStateRef = useRef<T>(initialState);

    // Track whether we are currently in an undo/redo cycle to avoid adding redundant history
    const isHistoryActionRef = useRef<boolean>(false);

    // Forces a re-render by updating state
    const forceUpdateState = (newState: T) => {
        setStateInternal(newState);
    };

    /**
     * Records a new state in history.
     * Use this for discrete actions like adding/deleting/moving blocks.
     */
    const pushState = useCallback((newState: T) => {
        if (isHistoryActionRef.current) return;

        // Don't push if the state hasn't actually changed meaningfully
        if (JSON.stringify(newState) === JSON.stringify(lastSavedStateRef.current)) return;

        // Push current "present" to past history
        pastRef.current = [...pastRef.current.slice(-(limit - 1)), lastSavedStateRef.current];
        futureRef.current = []; // Clear redo stack on new action
        lastSavedStateRef.current = newState;

        forceUpdateState(newState);
    }, [limit]);

    /**
     * Updates the current state without pushing to history immediately.
     * Use this for continuous updates like typing.
     */
    const updateState = useCallback((newStateOrUpdater: T | ((prev: T) => T)) => {
        const nextState = typeof newStateOrUpdater === "function"
            ? (newStateOrUpdater as any)(state)
            : newStateOrUpdater;

        setStateInternal(nextState);
    }, [state]);

    /**
     * Commits the current "transient" state to history.
     * Use this on blur or after a debounce for textual changes.
     */
    const commitHistory = useCallback(() => {
        if (JSON.stringify(state) === JSON.stringify(lastSavedStateRef.current)) return;

        pastRef.current = [...pastRef.current.slice(-(limit - 1)), lastSavedStateRef.current];
        futureRef.current = [];
        lastSavedStateRef.current = state;
    }, [state, limit]);

    const undo = useCallback(() => {
        if (pastRef.current.length === 0) return;

        isHistoryActionRef.current = true;

        const previous = pastRef.current[pastRef.current.length - 1];
        const newPast = pastRef.current.slice(0, pastRef.current.length - 1);

        futureRef.current = [lastSavedStateRef.current, ...futureRef.current].slice(0, limit);
        pastRef.current = newPast;
        lastSavedStateRef.current = previous;

        forceUpdateState(previous);

        setTimeout(() => { isHistoryActionRef.current = false; }, 0);
    }, [limit]);

    const redo = useCallback(() => {
        if (futureRef.current.length === 0) return;

        isHistoryActionRef.current = true;

        const next = futureRef.current[0];
        const newFuture = futureRef.current.slice(1);

        pastRef.current = [...pastRef.current, lastSavedStateRef.current].slice(-(limit));
        futureRef.current = newFuture;
        lastSavedStateRef.current = next;

        forceUpdateState(next);

        setTimeout(() => { isHistoryActionRef.current = false; }, 0);
    }, [limit]);

    return {
        state,
        pushState,    // For discrete actions (Delete, Add, Format)
        updateState,  // For transient updates (Typing)
        commitHistory,// For finalization (OnBlur, OnDebounce)
        undo,
        redo,
        canUndo: pastRef.current.length > 0,
        canRedo: futureRef.current.length > 0,
        historyCount: pastRef.current.length
    };
}
