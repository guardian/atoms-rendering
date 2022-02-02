import type { OphanComponentEvent } from '@guardian/libs';

/**
 * This code is duplicated from DCR. This is intentional. We do not have an established
 * centralised solution for this type of code (making tracking requests) but it is
 * an area we are thinking about. In the meantime, we are keeping use cases separate
 * so that it will be easier to make any transition to a centralised solution
 * later
 *
 * See: https://github.com/guardian/dotcom-rendering/blob/88a31f1d74d2fb09d051ff75b513b4cbf31fdd23/dotcom-rendering/src/web/browser/ophan/ophan.ts
 */
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
