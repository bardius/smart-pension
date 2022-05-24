import React from 'react'
import type { VFC } from 'react'
import { Container, Heading, VStack } from '@chakra-ui/react'
import { useWishlistCitiesList } from '../contexts/cities/hooks'
import { CityList } from '../components/CityList'

export const WishList: VFC = () => {
  const citiesList = useWishlistCitiesList()

  return (
    <VStack as="main" spacing="8" data-testid="wishlist-page">
      <Heading as="h1">Wishlist</Heading>
      <Container centerContent maxW="container.md" flexDir="column">
        <CityList cities={citiesList} />
      </Container>
    </VStack>
  )
}
