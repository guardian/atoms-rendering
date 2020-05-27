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

also

```
yarn link // so you don't need to publish to test changes remotely
```

and then

```typescript
    "scripts": {
        "build": "microbundle --jsx React.createElement",
        "dev": "microbundle watch --jsx React.createElement",
        "storybook": "start-storybook -p 6006",
        "build-storybook": "build-storybook",
        "tsc": "tsc",
        "lint": "eslint . --ext .ts",
        "test": "jest --watch"
    }
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
2. Ensure you have an [Npm account](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages) that is authorised for the Npm @guardian organisation
3. `yarn build`
4. Create a branch, `yourname/v1.0.1`
5. `yarn publish` (enter new version number, eg. 1.0.1)
6. Create a PR for the version
7. Then, in the consuming project, update the version of `@guardian/atoms-rendering` installed to see the changes
