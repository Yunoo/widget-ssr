import createFetchMock from 'vitest-fetch-mock'
import { afterAll, beforeAll, expect, test, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import App from './page'
import { describe } from 'node:test'
import { WeatherData } from '@/types'

// Mock all fetch requests (we do not need it right now as we only have one func using fetch)
const fetchMocker = createFetchMock(vi)
fetchMocker.enableMocks()

// Mock openweather
vi.mock('@/lib/openweather', async () => {
  return {
    default: async (city: string): Promise<WeatherData | {}> => {
      return Promise.resolve({
        coord: { lon: 12.5655, lat: 55.6759 },
        weather: [
          {
            id: 802,
            main: 'Clouds',
            description: 'scattered clouds',
            icon: '03n',
          },
        ],
        base: 'stations',
        main: {
          temp: 10.94,
          feels_like: 9.84,
          temp_min: 8.52,
          temp_max: 11.94,
          pressure: 1019,
          humidity: 67,
        },
        visibility: 10000,
        wind: { speed: 4.12, deg: 110 },
        clouds: { all: 26 },
        dt: 1715651599,
        sys: {
          type: 2,
          id: 2035645,
          country: 'DK',
          sunrise: 1715655592,
          sunset: 1715713947,
        },
        timezone: 7200,
        id: 2618425,
        name: city,
        cod: 200,
      })
    },
  }
})

describe('Widget component test', async () => {
  beforeAll(() => {
    // We can mock fetch response here as well instead of using vi.mock
    // fetchMocker.mockResponse(() => JSON.stringify({ }))
  })
  afterAll(() => {
    vi.resetAllMocks()
  })
  test('Widget is rendered', async () => {
    const component = render(await App())
    expect(screen.getByTestId('weather-widget')).toBeDefined()
    expect(screen.getByText(/weather in/i)).toBeDefined()
    const weatherList = screen.getByRole('list', { name: /weather-data/i })
    expect(within(weatherList).getAllByRole('listitem').length).toBe(4)

    const form = within(weatherList).getByRole('form', { name: 'search-form' })
    expect(within(form).getByRole('textbox')).toBeDefined()
    expect(within(form).getByRole('button', { name: /search/i })).toBeDefined()

    component.unmount()
  })
  test('City name is passed to a component and text is shown', async () => {
    const city = 'Tallinn'
    const component = render(await App({ searchParams: { city } }))
    expect(screen.getByText(new RegExp(`${city}`, 'i'))).toBeDefined()
    component.unmount()
  })
})
