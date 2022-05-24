import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import { CityCard } from '../../components/CityCard'
import { render } from '../../test-utils'

const mockUpdateCityFn = jest.fn()

jest.mock('../../contexts/cities/hooks', () => ({
  useUpdateCity: () => mockUpdateCityFn,
}))

describe('Component - CityCard', () => {
  it('Should render city with visited & wishlist selection', () => {
    const renderLayout = render(
      <CityCard id={1} title={'London'} subTitle={'United Kingdom'} visited={true} wishlist={true} />
    )

    expect(screen.getByTestId('city-card')).toBeInTheDocument()
    expect(screen.getByTestId('city-card-wishlist-btn-active')).toBeInTheDocument()
    expect(screen.getByTestId('city-card-visited-btn-active')).toBeInTheDocument()

    const { asFragment } = renderLayout
    expect(asFragment()).toMatchSnapshot()
  })

  it('Should render city without visited & wishlist selection', () => {
    const renderLayout = render(
      <CityCard id={1} title={'London'} subTitle={'United Kingdom'} visited={false} wishlist={false} />
    )
    expect(screen.getByTestId('city-card')).toBeInTheDocument()
    expect(screen.getByTestId('city-card-wishlist-btn')).toBeInTheDocument()
    expect(screen.getByTestId('city-card-visited-btn')).toBeInTheDocument()

    const { asFragment } = renderLayout
    expect(asFragment()).toMatchSnapshot()
  })

  it('Should make request to toggle visited state', () => {
    render(<CityCard id={1} title={'London'} subTitle={'United Kingdom'} visited={false} wishlist={false} />)

    const visitedBtn = screen.getByTestId('city-card-visited-btn')

    fireEvent.click(visitedBtn)

    expect(mockUpdateCityFn).toHaveBeenCalledTimes(1)
  })

  it('Should make request to toggle wishlist state', () => {
    render(<CityCard id={1} title={'London'} subTitle={'United Kingdom'} visited={false} wishlist={false} />)

    const wishlistBtn = screen.getByTestId('city-card-wishlist-btn')

    fireEvent.click(wishlistBtn)

    expect(mockUpdateCityFn).toHaveBeenCalledTimes(1)
  })
})
