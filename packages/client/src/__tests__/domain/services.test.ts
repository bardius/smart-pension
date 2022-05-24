import {
  filterObjectArrayByBooleanKeyValue,
  filterObjectArrayByPartialKeyValue,
  sortCitiesData,
  sortObjectsByKey,
} from '../../domain/cities/service'
import { citiesResponse } from '../../__mocks__/citiesResponse'

describe('Domain - Cities Service', () => {
  it('Should sort cities', async () => {
    const sortedCities = sortCitiesData(citiesResponse)

    expect(sortedCities[0].name).toBe('A Coruna')
  })

  it('Should compare cities by key for sorting', async () => {
    const comparatorResult = sortObjectsByKey('name')(citiesResponse.cities.cities[0], citiesResponse.cities.cities[1])

    expect(comparatorResult).toBe(-1)
  })

  it('Should filter Object Array By Boolean Key Value', async () => {
    const filteredCities = filterObjectArrayByBooleanKeyValue(citiesResponse.cities.cities, 'visited', true)

    expect(filteredCities.length).toBe(1)
  })

  it('Should filter Object Array By Partial Key Value', async () => {
    const filteredCities = filterObjectArrayByPartialKeyValue(citiesResponse.cities.cities, 'name', 'Lon')

    expect(filteredCities.length).toBe(6)
  })

  it('Should return Object Array if no search query is passed in By Partial Key Value filer', async () => {
    const filteredCities = filterObjectArrayByPartialKeyValue(citiesResponse.cities.cities, 'name')

    expect(filteredCities.length).toBe(500)
  })
})
