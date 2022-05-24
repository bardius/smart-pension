import React from 'react'
import type { FC } from 'react'
import { ChakraProvider, Box, extendTheme } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import { TopBar } from './components/TopBar'
import { Home } from './pages/Home'
import { WishList } from './pages/WishList'
import { Visited } from './pages/Visited'
import { defaultTheme } from './theme/default'
import { CitiesProvider } from './contexts/cities/CitiesProvider'

// Need to add error Boundaries on at least page level
// We can lazy load pages with suspense
export const App: FC = () => (
  <ChakraProvider theme={extendTheme({ ...defaultTheme })}>
    <CitiesProvider>
      <TopBar />
      <Box textAlign="center">
        <Routes>
          <Route index element={<Home />} />
          <Route path="wish-list" element={<WishList />} />
          <Route path="visited" element={<Visited />} />
        </Routes>
      </Box>
    </CitiesProvider>
  </ChakraProvider>
)
