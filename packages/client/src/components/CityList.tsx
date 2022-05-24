import React from 'react'
import type { VFC } from 'react'
import { SimpleGrid } from '@chakra-ui/react'
import type { City } from '../domain/cities/types'
import { CityCard } from './CityCard'

export type CityListProps = {
  cities?: City[]
}

// We could add aria-live="polite" aria-relevant="additions removals" in SimpleGrid but maybe it is to much for this list
export const CityList: VFC<CityListProps> = props => {
  const { cities } = props

  return (
    <>
      {cities?.length === 0 && <p data-testid={'city-list-empty'}>No results</p>}

      {cities && cities.length > 0 && (
        <SimpleGrid as="ul" columns={1} spacing={10} width={'100%'} mb={10} data-testid={'city-list'}>
          {cities.map(city => {
            return (
              <CityCard
                key={city.id}
                id={city.id}
                title={city.name}
                subTitle={city.country}
                visited={city.visited}
                wishlist={city.wishlist}
              />
            )
          })}
        </SimpleGrid>
      )}
    </>
  )
}
