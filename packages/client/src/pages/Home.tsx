import type { VFC } from 'react'
import React, { useCallback } from 'react'
import { Alert, AlertIcon, Container, Heading, Spinner, VStack } from '@chakra-ui/react'
import { SearchInput } from '../components/SearchInput'
import {
  useCitiesListError,
  useCitiesListLoading,
  useCitiesSetClientSideFilter,
  useCitiesSetFilter,
  useFilteredCitiesList,
} from '../contexts/cities/hooks'
import { CityList } from '../components/CityList'

// Performance improvement: only render visible rows simple list virtualization
export const Home: VFC = () => {
  const citiesList = useFilteredCitiesList() // or useCitiesList() to get the results from the API only
  const loading = useCitiesListLoading()
  const error = useCitiesListError()
  const setFilterToAPI = useCitiesSetFilter()
  const setClientSideFilter = useCitiesSetClientSideFilter()

  // One approach is to search via request at all times
  const onSearchChangeFromAPI = useCallback(
    (searchQuery: string) => {
      const nextFilter = { name: searchQuery }
      setFilterToAPI && setFilterToAPI(nextFilter)
    },
    [setFilterToAPI]
  )

  // Another (if we know our list does not change and is not an extremely long one)
  // is to fetch all and then operate on the data only on client side unless data gets mutated
  const onSearchChangeClientside = useCallback(
    (searchQuery: string) => {
      setClientSideFilter && setClientSideFilter(searchQuery)
    },
    [setClientSideFilter]
  )

  return (
    <VStack as="main" spacing="8" data-testid="home-page">
      <Heading as="h1">Smart traveller</Heading>
      <Container maxW="container.md">
        <SearchInput onChange={onSearchChangeClientside} onSubmit={onSearchChangeFromAPI} />
      </Container>

      <Container centerContent maxW="container.md" flexDir="column">
        {loading && <Spinner data-testid="loading-spinner" size="xl" />}

        {error && (
          <Alert status="error" data-testid="error-alert">
            <AlertIcon />
            Error:{' '}
            {error.graphQLErrors.map(({ message }, i) => (
              <span key={i}>{message}</span>
            ))}
          </Alert>
        )}

        <CityList cities={citiesList} />
      </Container>
    </VStack>
  )
}
