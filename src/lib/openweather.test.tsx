import createFetchMock from 'vitest-fetch-mock'
import { afterAll, expectTypeOf, beforeAll, expect, test, vi, describe, assertType } from 'vitest'
import getWeather from '@/lib/openweather'
import type { WeatherData } from '@/types'

const fetchMocker = createFetchMock(vi)
fetchMocker.enableMocks()

describe('Fetch weather data', async () => {
  // const spy = vi.spyOn(getWeather, 'default')
  // spy.mockImplementation(mockedImplementation)
  beforeAll(() => {
    fetchMocker.mockResponse(() =>
      JSON.stringify({
        coord: { lon: -0.1257, lat: 51.5085 },
        weather: [
          {
            id: 501,
            main: 'Rain',
            description: 'moderate rain',
            icon: '10n',
          },
        ],
        base: 'stations',
        main: {
          temp: 14.88,
          feels_like: 14.7,
          temp_min: 13.71,
          temp_max: 15.7,
          pressure: 999,
          humidity: 87,
        },
        visibility: 6000,
        wind: { speed: 2.57, deg: 80 },
        rain: { '1h': 1.15 },
        clouds: { all: 75 },
        dt: 1715656482,
        sys: {
          type: 2,
          id: 2075535,
          country: 'GB',
          sunrise: 1715659781,
          sunset: 1715715850,
        },
        timezone: 3600,
        id: 2643743,
        name: 'London',
        cod: 200,
      }),
    )
  })
  afterAll(() => {
    vi.resetAllMocks()
  })
  test('Empty city name', () => {
    expect(() => getWeather()).rejects.toThrowError(/missing city name/i)
  })
  test('Test remote API to match ', async () => {
    fetchMocker.dontMockOnce()
    const fetchedWeatherData = await getWeather('Stockholm')
    expectTypeOf(fetchedWeatherData).toMatchTypeOf<WeatherData | {}>()
  })
})
