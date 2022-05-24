import { createContext } from 'use-context-selector'
import { defaultProviderState } from './defaultState'
import type { CitiesProviderState } from './types'

const CitiesContext = createContext<CitiesProviderState>(defaultProviderState)

export { CitiesContext }
