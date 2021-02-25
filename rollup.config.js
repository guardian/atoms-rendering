import pkg from './package.json';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import clear from 'rollup-plugin-clear';
import visualizer from 'rollup-plugin-visualizer';

const extensions = ['.ts', '.tsx'];

module.exports = {
    input: './src/index.ts',
    output: [
        {
            file: 'dist/index.js',
            format: 'cjs',
        },
        {
            file: 'dist/index.esm.js',
            format: 'esm',
        },
    ],
    external: [
        // Ignore all dependencies and PeerDependencies in dist
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
        'prop-types',
        // Nested src-foundations
        '@guardian/src-foundations/mq',
        '@guardian/src-foundations/palette',
        '@guardian/src-foundations/typography',
    ],
    plugins: [
        clear({
            targets: ['dist/'],
        }),
        babel({ extensions }),
        resolve({ extensions }),
        commonjs(),
        visualizer({ filename: 'dist/stats.html' }),
    ],
};
