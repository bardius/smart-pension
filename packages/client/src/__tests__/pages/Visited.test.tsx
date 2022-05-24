import React from 'react'
import { screen } from '@testing-library/react'
import { render } from '../../test-utils'
import { Visited } from '../../pages/Visited'
import { CitiesProvider } from '../../contexts/cities/CitiesProvider'

describe('Page - Visited', () => {
  it('should render the Visited page content', async () => {
    const renderLayout = render(
      <CitiesProvider>
        <Visited />
      </CitiesProvider>
    )

    expect(screen.getByTestId('visited-page')).toBeInTheDocument()
    expect(await screen.findByTestId('city-list')).toBeInTheDocument()

    const { asFragment } = renderLayout
    expect(asFragment()).toMatchSnapshot()
  })
})
