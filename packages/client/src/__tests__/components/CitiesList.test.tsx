import React from 'react'
import { screen } from '@testing-library/react'
import { CityList } from '../../components/CityList'
import { render } from '../../test-utils'
import { citiesResponse } from '../../__mocks__/citiesResponse'

describe('Component - CityList', () => {
  it('Should render message if no cities are provided', () => {
    const renderLayout = render(<CityList cities={[]} />)
    expect(screen.getByTestId('city-list-empty')).toBeInTheDocument()

    const { asFragment } = renderLayout
    expect(asFragment()).toMatchSnapshot()
  })

  it('Should render city cards if cities are provided', () => {
    const renderLayout = render(<CityList cities={citiesResponse.cities.cities} />)
    expect(screen.getByTestId('city-list')).toBeInTheDocument()

    const { asFragment } = renderLayout
    expect(asFragment()).toMatchSnapshot()
  })
})
