import { useEffect, useMemo, useState } from 'react'
import type { FC } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { GET_CITIES, UPDATE_CITY } from '../../domain/cities/queries'
import type { City, CitiesFilters, CitiesMutationInput, CitiesResult } from '../../domain/cities/types'
import { sortCitiesData } from '../../domain/cities/service'
import { CitiesContext } from './CitiesContext'

// Holds all the logic of the state management and the required request orchestration
// and any mutation or actions of the datasets like sorting (added a sample sorting)
const CitiesProvider: FC = ({ children }) => {
  const [filter, setFilter] = useState<Partial<CitiesFilters>>({})
  const [clientSideFilter, setClientSideFilter] = useState<string>('')

  // Define queries/mutations
  const {
    loading: loadingCitiesList,
    error: errorCitiesList,
    data: dataCitiesList,
    refetch: refetchCitiesList,
  } = useQuery<CitiesResult, { filter: Partial<CitiesFilters> }>(GET_CITIES, {
    variables: { filter: filter },
  })

  // Instead of re-fetching all cities data we could update the cached city list
  // after mutation with update option and cache.modify
  // We can also force refresh list via options with { refetchQueries: [GET_CITIES, 'GetCities'] }
  const [updateCity, { loading: loadingUpdateCity, error: errorUpdateCity, data: dataUpdateCity }] = useMutation<
    { updateCity: City },
    { input: CitiesMutationInput }
  >(UPDATE_CITY)

  // Sample sorting
  // for serverside pagination the sorting should also be done serverside and not here
  const sortedCityList = useMemo(() => {
    return sortCitiesData(dataCitiesList)
  }, [dataCitiesList])

  // One way of implementing this if we do not wish to get all cities in one go
  // and then just do the filtering on the UI is to use useLazyQuery and then
  // keep updating the filters in state this will cause new request per typed
  // char. Leaving as only performance improvement the debounce on change or
  // to change the event handler on blur for the search input
  useEffect(() => {
    refetchCitiesList({ filter: filter })
  }, [refetchCitiesList, filter])

  // Expose values via the provider state
  const stateValues = {
    citiesList: sortedCityList,
    loadingCitiesList: loadingCitiesList,
    errorCitiesList: errorCitiesList,
    updatedCity: dataUpdateCity?.updateCity,
    loadingUpdateCity: loadingUpdateCity,
    errorUpdateCity: errorUpdateCity,
    setFilter: setFilter,
    clientSideFilter: clientSideFilter,
    setClientSideFilter: setClientSideFilter,
    updateCity: updateCity,
  }

  return <CitiesContext.Provider value={stateValues}>{children}</CitiesContext.Provider>
}

export { CitiesProvider }
