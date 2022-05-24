import React from 'react'
import { fireEvent, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { render } from '../../test-utils'
import { Home } from '../../pages/Home'
import { CitiesProvider } from '../../contexts/cities/CitiesProvider'

const mockSetFilterToAPIFn = jest.fn()
const mockSetClientSideFilterFn = jest.fn()

jest.mock('../../contexts/cities/hooks', () => {
  const original = jest.requireActual('../../contexts/cities/hooks')
  return {
    ...original,
    useCitiesSetFilter: () => mockSetFilterToAPIFn,
    useCitiesSetClientSideFilter: () => mockSetClientSideFilterFn,
  }
})

describe('Page - Home', () => {
  it('should render the Home page content', async () => {
    const renderLayout = render(
      <CitiesProvider>
        <Home />
      </CitiesProvider>
    )

    await waitForElementToBeRemoved(() => screen.getByTestId('loading-spinner'))

    const { asFragment } = renderLayout
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders the Home page content', async () => {
    render(
      <CitiesProvider>
        <Home />
      </CitiesProvider>
    )

    await waitForElementToBeRemoved(() => screen.getByTestId('loading-spinner'))

    fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'London' } })

    fireEvent.click(screen.getByTestId('search-input-btn'))

    expect(mockSetFilterToAPIFn).toHaveBeenCalledTimes(1)
    expect(mockSetClientSideFilterFn).toHaveBeenCalledTimes(1)
  })
})
