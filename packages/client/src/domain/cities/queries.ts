import { gql } from '@apollo/client'

const GET_CITIES = gql`
  query GetCities($filter: CitiesFilters, $limit: Int, $offset: Int) {
    cities(filter: $filter, limit: $limit, offset: $offset) {
      cities {
        id
        name
        country
        visited
        wishlist
      }
      total
    }
  }
`

const UPDATE_CITY = gql`
  mutation UpdateCity($input: CitiesMutationInput) {
    updateCity(input: $input) {
      id
      visited
      wishlist
    }
  }
`

export { GET_CITIES, UPDATE_CITY }
