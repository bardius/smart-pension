import type { GenericObject, City, CitiesResult } from './types'

const intlCollator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' })

// If performance is a big factor we can skip the Intl.Collator and just sort chars
const sortObjectsByKey =
  (compareKey: string) =>
  (a: GenericObject, b: GenericObject): number => {
    return intlCollator.compare(a[compareKey], b[compareKey])
  }

const filterObjectArrayByPartialKeyValue = <T = GenericObject>(
  list: T[],
  keyName: string,
  searchQuery?: string
): T[] => {
  return searchQuery
    ? list.filter(item => (item as any)[keyName]?.toLowerCase().includes(searchQuery.toLowerCase()))
    : list
}

const filterObjectArrayByBooleanKeyValue = <T = GenericObject>(list: T[], keyName: string, value: boolean): T[] => {
  return list.filter(item => (item as any)[keyName] === value)
}

const sortCitiesData = (data?: CitiesResult): City[] | undefined => {
  const citiesList = data && data.cities && data.cities?.cities
  return citiesList ? [...citiesList].sort(sortObjectsByKey('name')) : citiesList
}

export { sortObjectsByKey, filterObjectArrayByPartialKeyValue, filterObjectArrayByBooleanKeyValue, sortCitiesData }
