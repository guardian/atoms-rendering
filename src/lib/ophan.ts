import type { OphanComponentEvent } from '@guardian/libs';

declare global {
    /* ~ Here, declare things that go in the global namespace, or augment
     *~ existing declarations in the global namespace
     */
    interface Window {
        guardian: {
            ophan: {
                setEventEmitter: () => void; // We don't currently have a custom eventEmitter on DCR - like 'mediator' in Frontend.
                trackComponentAttention: (
                    name: string,
                    el: Element,
                    visiblityThreshold: number,
                ) => void;
                record: () => void;
                viewId: string;
                pageViewId: string;
            };
        };
    }
}

type OphanRecordFunction = (event: { [key: string]: any }) => void;

const getOphanRecordFunction = (): OphanRecordFunction => {
    const record =
        window &&
        window.guardian &&
        window.guardian.ophan &&
        window.guardian.ophan.record;

    if (record) {
        return record;
    }
    console.log('window.guardian.ophan.record is not available');
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
};

export const submitComponentEvent = (
    componentEvent: OphanComponentEvent,
): void => {
    const record = getOphanRecordFunction();
    record({ componentEvent });
};
