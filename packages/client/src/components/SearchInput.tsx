import { Box, IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { useCallback, useState } from 'react'
import type { VFC } from 'react'

export type SearchInputProps = {
  onChange: (value: string) => void
  onSubmit: (value: string) => void
}

export const SearchInput: VFC<SearchInputProps> = ({ onChange, onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('')

  const onSearchChange = useCallback(
    event => {
      const newSearchQuery = event.target.value || ''
      setSearchQuery(newSearchQuery)
      onChange(newSearchQuery)
    },
    [onChange, setSearchQuery]
  )

  const onSearchSubmit = useCallback(() => {
    onSubmit(searchQuery)
  }, [searchQuery, onSubmit])

  return (
    <Box as="form" role="search">
      <InputGroup>
        <Input
          data-testid="search-input"
          onChange={onSearchChange}
          value={searchQuery}
          type="search"
          aria-label={'Search by city name, search results will appear below'}
        />
        <InputRightElement
          data-testid="search-input-btn"
          onClick={onSearchSubmit}
          children={
            <IconButton aria-label={`Search cities by name containing ${searchQuery}`} icon={<Search2Icon />} />
          }
        />
      </InputGroup>
    </Box>
  )
}
