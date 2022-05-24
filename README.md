# Traveller - Smart front end take-home technical test

## Goals

1.  Allow the user to search for cities using the provided input.
2.  Display the cities found on the home page.
3.  Allow the user to set the visited/wishlist state of a city to `true`/`false` via API requests.
4.  Cities that have visited/wishlist set to `true` should then appear on their respective pages.

## Install and run

```
npx lerna bootstrap
yarn start:all
```

## Info

### API

We have provided both a REST and a GraphQL API, you are free to use whichever you are most comfortable with in your solution. You can find documention for these at the following URLS:

- REST - [http://localhost:4000/rest](http://localhost:4000/rest)
- GraphQL - [http://localhost:4000/graphql](http://localhost:4000/graphql)

### Client

After running the client you will find a home page with an input field that is currently non-functional as well an empty wish list and visited pages.

We have provided a few packages that will help you in your solution:

- If you choose to use GraphQL we have added [Apollo Client](https://www.apollographql.com/docs/react).
- For testing, we have provided [Jest](https://jestjs.io)/[React Testing Libary](https://testing-library.com/docs/react-testing-library/intro).
- For styling, you will find the component library [Chakra UI](https://chakra-ui.com).

## What we're looking for

- Use of abstractions where they make sense (DRY).
- Sensible choices regarding performance.
- Functionality tested.
- An accessible solution.
- We use TypeScript and would be happy to see a well typed solution, however if you're not comfortable with this feel free to use JavaScript.

# Solution outline

The test was implemented with typescript, GraphQL and Chakra UI as component library.
Focus has been given in the 4 layer architecture of the code and the selection of libraries utilised rather than the UI/UX design.

Was unsure if you would like to get all data in one go, when user types in search field, and then operate on it in client side or only when the user clicks the search button.
Provided an example for both, and I opted in the first to reduce network calls given that the amount of cities is not that large.

Happy to change solution if requested.

## Folder Structure Outline

Under packages/client/src, you can find the source code separated as:

- __mocks__: graphql queries and mock data for unit tests
- __tests__: unit test specification files and snapshots (follows the same structure as the codebase)
- components: presentational components with no or minimal logic and state
- contexts: Context API and providers, that expose values to consumer via hooks, utilising the use-context-selector library for performance. All data and requests are orchestrated here
- domain: Businesses logic in encapsulated in their respective folders, can be reused or utilised as vanilla typescript code
- pages: components that act as routes for react router
- theme: UI component library theme

## Libraries

A curated list of libraries has been added on top of CRA:

- use-context-selector: to optimize the Context API state retrieval as slices

## Potential improvements

Due to time constraints not all aspects of the application have been taken care of.
Most notable:

- Proper UI/UX for eye sugar
- Accessibility that passes WCAG AA, have added a baseline for screen readers
- Unit tests for all hooks
- HTML tile and meta management per page
- Security related issues
- Performance optimization like virtualizing the list of cities

If any of these is a requirement, happy to provide it on follow-up commits.
