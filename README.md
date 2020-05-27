# Atoms Rendering

## What is an Atom?

An Atom is a self contained piece of content that can be inserted into multiple articles. There are several different types of atoms, this repository aims to document them all.

## Why are they here?

Mainly so we can share this code cross platform, but also to create one location where atoms are listed, typed and defined.

## Usage

To import an atom in your project use `yarn add @guardian/atoms-rendering` then

```
import { TheAtomYouWant } from '@guardian/atoms-rendering';

<TheAtomYouWant someProp={localData.someProp} />
```

## Running locally

```
git clone https://github.com/guardian/atoms-rendering.git
yarn
yarn storybook
```

### How do you add a new atom to this repo?

Adding a new atom in `atoms-rendering` involves

1. Adding the component, eg. MyComponent.tsx
2. Adding stories, eg. MyComponent.stories.tsx
3. Adding a line to `index.ts` to export the component
4. Publishing a new version of the library to Npm (see below)

## Publishing

Manual publishing steps:

1. Ensure your changes are on master
2. `yarn build`
3. Create a branch, `yourname/v1.0.1`
4. `yarn publish` (enter new version number, eg. 1.0.1)
5. Create a PR for the version
6. Then, in the consuming project, update the version of `@guardian/atoms-rendering` installed to see the changes
