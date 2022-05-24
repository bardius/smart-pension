import React, { useCallback } from 'react'
import type { VFC } from 'react'
import { Box, Text, IconButton } from '@chakra-ui/react'
import { PlusSquareIcon, StarIcon } from '@chakra-ui/icons'
import { useUpdateCity } from '../contexts/cities/hooks'

export type CityCardProps = {
  id: number
  title: string
  subTitle: string
  visited: boolean
  wishlist: boolean
}

export const CityCard: VFC<CityCardProps> = props => {
  const { id, title, subTitle, visited, wishlist } = props
  // This could be moved to a prop and drill it down in order to make this card more generic
  const updateCity = useUpdateCity()

  const onToggleVisited = useCallback(() => {
    updateCity({
      variables: { input: { id: id, visited: !visited, wishlist: wishlist } },
      optimisticResponse: {
        updateCity: {
          id: id,
          name: title,
          country: subTitle,
          visited: !visited,
          wishlist: wishlist,
        },
      },
    })
  }, [updateCity, id, visited, wishlist, subTitle, title])

  const onToggleWishlist = useCallback(() => {
    updateCity({
      variables: { input: { id: id, visited: visited, wishlist: !wishlist } },
      optimisticResponse: {
        updateCity: {
          id: id,
          name: title,
          country: subTitle,
          visited: visited,
          wishlist: !wishlist,
        },
      },
    })
  }, [updateCity, id, visited, wishlist, subTitle, title])

  const wishlistBtnLabel = `${wishlist ? 'Added in wishlist' : 'Not in wishlist'}, Click to toggle status`
  const visitedBtnLabel = `${visited ? 'Marked as visited' : 'Marked as not visited'}, Click to toggle status`

  return (
    <Box
      as="li"
      p={4}
      display="flex"
      flexDirection={{ sm: 'column', lg: 'row' }}
      borderWidth={1}
      data-testid="city-card"
    >
      <Box textAlign={'left'} maxWidth={220}>
        <Text fontWeight="bold" fontSize="lg">
          {title}
        </Text>
        <Text as="span" fontWeight="normal" fontSize="md">
          ({subTitle})
        </Text>
      </Box>
      <Box ml={'auto'}>
        <IconButton
          data-testid={`city-card-visited-btn${visited ? '-active' : ''}`}
          mx={1}
          variant="outline"
          colorScheme={visited ? 'blue' : 'red'}
          title={visitedBtnLabel}
          aria-label={visitedBtnLabel}
          onClick={onToggleVisited}
          icon={<StarIcon />}
        />
        <IconButton
          data-testid={`city-card-wishlist-btn${visited ? '-active' : ''}`}
          mx={1}
          variant="outline"
          colorScheme={wishlist ? 'blue' : 'red'}
          title={wishlistBtnLabel}
          aria-label={wishlistBtnLabel}
          onClick={onToggleWishlist}
          icon={<PlusSquareIcon />}
        />
      </Box>
    </Box>
  )
}
