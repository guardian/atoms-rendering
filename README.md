# Atoms Rendering

## Atoms

An Atom is a self contained piece of content that can be inserted into multiple articles. There are currently 13 types of atoms. This repository implements them as a separate self contained library. 

## Usage

To import an atom in your project use `yarn add @guardian/atoms-rendering` then

```
import { TheAtomYouWant } from '@guardian/atoms-rendering';

<TheAtomYouWant someProp={localData.someProp} />
```

## Running locally

```
$ git clone https://github.com/guardian/atoms-rendering.git
or
$ git clone git@github.com:guardian/atoms-rendering.git
```

Make sure that you have `yarn` installed, if not run

```
$ brew install yarn
```

Then,

```
$ yarn
$ yarn storybook
```

The available yarn commands are given below:

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

## Testing locally

If you want to test a change before publishing to NPM, you will need to point to this repository. For instance, you might want to check in dotcom-rendering on local that a change you make in this library is correct. For this do the following

1. In atoms-rendering run `yarn build`
2. In atoms-rendering run `yarn link`, then
3. In dotcom-rendering run `yarn link "@guardian/atoms-rendering"`. 

After Step 2 you will notice that your 

```
dotcom-rendering/node_modules/@guardian/atoms-rendering
```

is a symlink to this repository.

## Adding a new atom 

Adding a new atom in `atoms-rendering` involves

1. Adding the component, eg. MyComponent.tsx
2. Adding stories, eg. MyComponent.stories.tsx
3. Adding a line to `index.ts` to export the component
4. Publishing a new version of the library to Npm (see below)

## Publishing to NPM

Manual publishing steps:

1. Ensure your changes are on master
2. Ensure you have an [npm account](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages) that is authorised for the npm @guardian organisation
3. `yarn build`
4. Create a branch, `yourname/v1.0.1`
5. `yarn publish` (enter new version number, eg. 1.0.1)
6. Create a PR for the version
7. Then, in the consuming project, update the version of `@guardian/atoms-rendering` installed to see the changes
