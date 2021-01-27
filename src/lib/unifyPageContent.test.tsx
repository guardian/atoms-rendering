import '@testing-library/jest-dom/extend-expect';

import { unifyPageContent } from './unifyPageContent';

describe('unifyPageContent', () => {
    const someHTML = `<div>I am the best HTML string out there</div>`;
    const someCSS = `div {
      color: blue;
    }`;
    const someJS = `console.log('hello world!')`;

    it('should each content', () => {
        const outputHTML = unifyPageContent({
            html: someHTML,
            css: someCSS,
            js: someJS,
        });
        expect(outputHTML).toContain(someHTML);
        expect(outputHTML).toContain(someCSS);
        expect(outputHTML).toContain(someJS);
    });

    it('should not render style tag', () => {
        const outputHTML = unifyPageContent({
            html: someHTML,
            js: someJS,
        });
        expect(outputHTML).not.toContain(`<style`);
    });

    it('should not render div tag', () => {
        const outputHTML = unifyPageContent({
            css: someCSS,
            js: someJS,
        });
        expect(outputHTML).not.toContain(`<div`);
    });
});
