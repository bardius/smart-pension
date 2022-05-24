import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import { SearchInput } from '../../components/SearchInput'
import { render } from '../../test-utils'

describe('Component - SearchInput', () => {
  it('Should render', async () => {
    const onChange = jest.fn()
    const onSubmit = jest.fn()
    const renderLayout = render(<SearchInput onChange={onChange} onSubmit={onSubmit} />)

    expect(screen.getByTestId('search-input')).toBeInTheDocument()
    expect(screen.getByTestId('search-input-btn')).toBeInTheDocument()

    const { asFragment } = renderLayout
    expect(asFragment()).toMatchSnapshot()
  })

  it('Should act on change', () => {
    const onChange = jest.fn()
    const onSubmit = jest.fn()
    render(<SearchInput onChange={onChange} onSubmit={onSubmit} />)

    fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'London' } })

    expect(onChange).toBeCalledTimes(1)
  })

  it('Should act on submit', () => {
    const onChange = jest.fn()
    const onSubmit = jest.fn()
    render(<SearchInput onChange={onChange} onSubmit={onSubmit} />)

    fireEvent.click(screen.getByTestId('search-input-btn'))

    expect(onSubmit).toBeCalledTimes(1)
  })
})
