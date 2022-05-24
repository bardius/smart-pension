import React from 'react'
import type { VFC } from 'react'
import { Container, Heading, VStack } from '@chakra-ui/react'
import { useVisitedCitiesList } from '../contexts/cities/hooks'
import { CityList } from '../components/CityList'

export const Visited: VFC = () => {
  const citiesList = useVisitedCitiesList()

  return (
    <VStack as="main" spacing="8" data-testid="visited-page">
      <Heading as="h1">Visited</Heading>
      <Container centerContent maxW="container.md" flexDir="column">
        <CityList cities={citiesList} />
      </Container>
    </VStack>
  )
}
