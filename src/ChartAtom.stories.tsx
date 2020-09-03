import React from 'react';

import { ChartAtom } from './ChartAtom';
import { html } from '../fixtures/chartAtoms';
import { css } from 'emotion';
export default {
    title: 'ChartAtom',
    component: ChartAtom,
};

const js =
    "<script>var iframes = document.getElementsByClassName('atom__iframe');console.log(iframes);window.addEventListener('message', (event) => {const iframe = iframes.find((i) => {try {return i.name === event.source.name;} catch (e) {return false;}});if (iframe) {try {const message = JSON.parse(event.data);switch (message.type) {case 'set-height':iframe.height = message.value;break;default:}} catch (e) {}}});iframes.forEach((iframe) => {const src = (iframe.getAttribute('srcdoc') || '').replace(/<gu-script>/g, '<script>').replace(/</gu-script>/g, '<' + '/script>');iframe.setAttribute('srcdoc', src);});</script>";

export const DefaultStory = (): JSX.Element => {
    //console.log(html);
    //const html2 = html.replace('</body>', js + '</body>');

    return (
        <ChartAtom
            id="abc123"
            url="https://embed.theguardian.com/embed/atom/chart/650c584d-551f-41ac-8bf8-3283fb04a863"
            html={html}
        />
    );
};
