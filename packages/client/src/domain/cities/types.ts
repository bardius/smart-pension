export type City = {
  id: number
  name: string
  country: string
  visited: boolean
  wishlist: boolean
}

export type CitiesMutationInput = {
  id: number
  visited: boolean
  wishlist: boolean
}

export type CitiesResult = {
  cities: {
    cities: City[]
    total: number
  }
}

export type CitiesFilters = {
  id: number
  name: string
  country: string
  visited: boolean
  wishlist: boolean
}

export type GenericObject = {
  [key: string]: any
}
