import type { Dispatch, SetStateAction } from 'react'
import type { FetchResult } from '@apollo/client'
import type { MutationFunctionOptions } from '@apollo/client/react/types/types'
import type { ApolloError } from '@apollo/client/errors'
import type { City } from '../../domain/cities/types'
import type { CitiesFilters, CitiesMutationInput } from '../../domain/cities/types'

export type CitiesProviderState = {
  citiesList?: City[]
  loadingCitiesList?: boolean
  errorCitiesList?: ApolloError
  updatedCity?: City | null
  loadingUpdateCity?: boolean
  errorUpdateCity?: ApolloError
  updateCity: (
    options?: MutationFunctionOptions<{ updateCity: City }, { input: CitiesMutationInput }>
  ) => Promise<FetchResult<{ updateCity: City }>>
  filter?: Partial<CitiesFilters>
  setFilter?: Dispatch<SetStateAction<Partial<CitiesFilters>>>
  clientSideFilter?: string
  setClientSideFilter?: Dispatch<SetStateAction<string>>
}
