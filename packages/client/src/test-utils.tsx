import * as React from 'react'
import type { RenderOptions } from '@testing-library/react'
import { render } from '@testing-library/react'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { MockedProvider } from '@apollo/client/testing'
import { citiesQueriesMocks } from './__mocks__/citiesQueries'

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <MockedProvider mocks={citiesQueriesMocks} addTypename={false}>
    <ChakraProvider theme={theme}>{children}</ChakraProvider>
  </MockedProvider>
)

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options })

export { customRender as render }
