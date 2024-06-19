import { useState, useEffect, useMemo } from 'react'

const cityDefault = [
  { name: 'Київ', ref: 'e718a680-4b33-11e4-ab6d-005056801329' },
  { name: 'Львів', ref: 'e71abb60-4b33-11e4-ab6d-005056801329' },
  { name: 'Одеса', ref: 'e71c2a15-4b33-11e4-ab6d-005056801329' },
  { name: 'Дніпро', ref: 'e717110a-4b33-11e4-ab6d-005056801329' },
  { name: 'Харків', ref: 'e71f8842-4b33-11e4-ab6d-005056801329' },
  { name: 'Рівне', ref: 'e71d65e1-4b33-11e4-ab6d-005056801329' }
]
const fetchNovaPoshtaCity = async (cityName: string) => {
  const apiKey = 'f07607422838cfac21a0d1b8603086ca'
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      apiKey,
      modelName: 'AddressGeneral',
      calledMethod: 'searchSettlements',
      methodProperties: {
        CityName: cityName,
        Limit: 20,
        Page: 1
      }
    })
  }

  const response = await fetch(
    'https://api.novaposhta.ua/v2.0/json/',
    requestOptions
  )

  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await response.json()
  return data.data
}

export const useNovaPoshtaCity = () => {
  const [novaPoshtaCity, setNovaPoshtaCity] = useState<any[]>([])
  const [valInputCity, setValInputCity] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleCityFetch = async (cityName: string) => {
    try {
      setLoading(true)
      const data = await fetchNovaPoshtaCity(cityName)
      const addresses = data[0]?.Addresses || []
      if (
        addresses.length > 0 &&
        addresses.some((address: any) => address.Warehouses > 0)
      ) {
        setNovaPoshtaCity(data)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const cityRenderNP = useMemo(
    () =>
      novaPoshtaCity.length > 0
        ? novaPoshtaCity[0].Addresses.map(
            (address: any) =>
              `${address.SettlementTypeCode} ${address.MainDescription} (${address.Area} обл.)`
          )
        : [],
    [novaPoshtaCity]
  )
  const options = useMemo(() => {
    if (!valInputCity) return cityDefault.map((city) => city.name)
    const filteredCities = cityDefault
      .map((city) => city.name)
      .filter((city) => city.toLowerCase().includes(valInputCity.toLowerCase()))
    return filteredCities.length > 0 ? filteredCities : cityRenderNP
  }, [valInputCity, cityRenderNP])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        valInputCity &&
        valInputCity.length > 3 &&
        !cityDefault.some((city) => city.name === valInputCity) &&
        !/[()]/.test(valInputCity)
      ) {
        setNovaPoshtaCity([])
        handleCityFetch(valInputCity)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [valInputCity])

  return {
    valInputCity,
    setValInputCity,
    loading,
    options,
    novaPoshtaCity,
    cityDefault
  }
}
