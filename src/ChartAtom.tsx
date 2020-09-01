import React from 'react';
import { css } from 'emotion';
import { space } from '@guardian/src-foundations';
import { text } from '@guardian/src-foundations/palette';

import { ChartAtomType } from './types';

export const ChartAtom = ({ id, url, html }: ChartAtomType): JSX.Element => {
    // The script tag needs to replaced with 'gu-script' to work with iframe
    // resizing on frontend
    html = html
        .split('<script>')
        .join('<gu-script>')
        .split('</script>')
        .join('</gu-script>');
    return (
        <div
            data-atom-id={id}
            data-atom-type="chart"
            className={css`
                padding-bottom: ${space[1]}px;
                padding-left: ${space[2]}px;
                padding-right: ${space[2]}px;
                color: ${text.primary};
                margin-bottom: ${space[2]}px;
            `}
        >
            <iframe
                className="atom__iframe"
                name={id}
                srcDoc={html}
                width="100%"
                frameBorder="0"
            ></iframe>
        </div>
    );
};
