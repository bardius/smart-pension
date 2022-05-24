import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { screen, waitForElementToBeRemoved } from '@testing-library/react'
import { render } from '../test-utils'
import { App } from '../App'

describe('<App /> component', () => {
  it('should render the Header content', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    const HeadingComponent = screen.getByText(/^Smart traveller$/i)

    await waitForElementToBeRemoved(() => screen.getByTestId('loading-spinner'))
    expect(HeadingComponent).toBeInTheDocument()
  })
})
