import { GET_CITIES, UPDATE_CITY } from '../domain/cities/queries'
import { citiesResponse } from './citiesResponse'

const citiesQueriesMocks = [
  {
    request: {
      query: GET_CITIES,
      variables: { filter: {} },
    },
    result: {
      data: { ...citiesResponse },
    },
  },
  {
    request: {
      query: UPDATE_CITY,
      variables: {
        input: {
          id: 1,
          visited: true,
          wishlist: false,
        },
      },
    },
    result: {
      data: {
        updateCity: {
          id: 1,
          name: 'London',
          country: 'United Kingdom',
          visited: true,
          wishlist: false,
        },
      },
    },
  },
  {
    request: {
      query: UPDATE_CITY,
      variables: {
        input: {
          id: 1,
          visited: false,
          wishlist: true,
        },
      },
    },
    result: {
      data: {
        updateCity: {
          id: 1,
          name: 'London',
          country: 'United Kingdom',
          visited: false,
          wishlist: true,
        },
      },
    },
  },
]

export { citiesQueriesMocks }
