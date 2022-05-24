import React from 'react'
import { screen } from '@testing-library/react'
import { render } from '../../test-utils'
import { WishList } from '../../pages/WishList'
import { CitiesProvider } from '../../contexts/cities/CitiesProvider'

describe('Page - WishList', () => {
  it('should render the WishList page content', async () => {
    const renderLayout = render(
      <CitiesProvider>
        <WishList />
      </CitiesProvider>
    )

    expect(screen.getByTestId('wishlist-page')).toBeInTheDocument()
    expect(await screen.findByTestId('city-list')).toBeInTheDocument()

    const { asFragment } = renderLayout
    expect(asFragment()).toMatchSnapshot()
  })
})
