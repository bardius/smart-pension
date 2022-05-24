import { useContext, useContextSelector } from 'use-context-selector'
import type { ApolloError } from '@apollo/client/errors'
import type { Dispatch, SetStateAction } from 'react'
import type { MutationFunctionOptions } from '@apollo/client/react/types/types'
import type { FetchResult } from '@apollo/client'
import { filterObjectArrayByBooleanKeyValue, filterObjectArrayByPartialKeyValue } from '../../domain/cities/service'
import type { City } from '../../domain/cities/types'
import type { CitiesFilters, CitiesMutationInput } from '../../domain/cities/types'
import type { CitiesProviderState } from './types'
import { CitiesContext } from './CitiesContext'

const useCitiesState = (): CitiesProviderState => {
  const context = useContext(CitiesContext)

  if (context === undefined) {
    throw new Error('CitiesContext must be used within CitiesProvider')
  }

  return context
}

const useCitiesList = (): City[] | undefined => {
  const contextSlice = useContextSelector(CitiesContext, state => state.citiesList)

  return contextSlice
}

const useCitiesListLoading = (): boolean | undefined => {
  const contextSlice = useContextSelector(CitiesContext, state => state.loadingCitiesList)

  return contextSlice
}

const useCitiesListError = (): ApolloError | undefined => {
  const contextSlice = useContextSelector(CitiesContext, state => state.errorCitiesList)

  return contextSlice
}

const useCitiesFilter = (): Partial<CitiesFilters> | undefined => {
  const contextSlice = useContextSelector(CitiesContext, state => state.filter)

  return contextSlice
}

const useWishlistCitiesList = (): City[] | undefined => {
  const contextSlice = useContextSelector(CitiesContext, state => state.citiesList)

  return contextSlice ? filterObjectArrayByBooleanKeyValue<City>(contextSlice, 'wishlist', true) : contextSlice
}

const useVisitedCitiesList = (): City[] | undefined => {
  const contextSlice = useContextSelector(CitiesContext, state => state.citiesList)

  return contextSlice ? filterObjectArrayByBooleanKeyValue<City>(contextSlice, 'visited', true) : contextSlice
}

const useCitiesSetFilter = (): Dispatch<SetStateAction<Partial<CitiesFilters>>> | undefined => {
  const contextSlice = useContextSelector(CitiesContext, state => state.setFilter)

  return contextSlice
}

const useCitiesSetClientSideFilter = (): Dispatch<SetStateAction<string>> | undefined => {
  const contextSlice = useContextSelector(CitiesContext, state => state.setClientSideFilter)

  return contextSlice
}

const useFilteredCitiesList = (): City[] | undefined => {
  const contextSlice = useContextSelector(CitiesContext, state => state.citiesList)
  const clientSideFilter = useContextSelector(CitiesContext, state => state.clientSideFilter)

  return contextSlice ? filterObjectArrayByPartialKeyValue<City>(contextSlice, 'name', clientSideFilter) : contextSlice
}

const useUpdatedCity = (): City | null | undefined => {
  const contextSlice = useContextSelector(CitiesContext, state => state.updatedCity)

  return contextSlice
}

const useUpdateCityLoading = (): boolean | undefined => {
  const contextSlice = useContextSelector(CitiesContext, state => state.loadingUpdateCity)

  return contextSlice
}

const useUpdateCityError = (): ApolloError | undefined => {
  const contextSlice = useContextSelector(CitiesContext, state => state.errorUpdateCity)

  return contextSlice
}

const useUpdateCity = (): ((
  options?: MutationFunctionOptions<{ updateCity: City }, { input: CitiesMutationInput }>
) => Promise<FetchResult<{ updateCity: City }>>) => {
  const contextSlice = useContextSelector(CitiesContext, state => state.updateCity)

  return contextSlice
}

export {
  useCitiesState,
  useCitiesList,
  useCitiesListLoading,
  useCitiesListError,
  useCitiesFilter,
  useWishlistCitiesList,
  useVisitedCitiesList,
  useCitiesSetFilter,
  useCitiesSetClientSideFilter,
  useFilteredCitiesList,
  useUpdatedCity,
  useUpdateCityLoading,
  useUpdateCityError,
  useUpdateCity,
}
