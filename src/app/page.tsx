import { SearchButton } from '@/app/components/search-button'
import getWeather from '@/lib/openweather'
import { getWindDirection } from '@/lib/wind'
import { Props } from '@/types'
import React from 'react'

const DEFAULT_CITY = 'Copenhagen'

export default async function App(props: Props): Promise<JSX.Element> {
  const { searchParams } = props || {}
  let weatherData
  try {
    const city = (Array.isArray(searchParams?.city) ? searchParams?.city?.shift() : searchParams?.city) || DEFAULT_CITY
    weatherData = await getWeather(city)
  } catch (e: any) {
    console.error(e.message)
    weatherData = {}
    // TODO: Proper error handling?
  }

  return (
    <div data-testid="weather-widget" className="widget">
      <div className="panel panel-info">
        <div className="panel-heading">
          Weather in <b>{weatherData?.name || ''}</b>
        </div>
        <ul aria-label="weather-data" className="list-group">
          <li className="list-group-item">
            Temperature: <b>{weatherData?.main?.temp}°C</b>
          </li>
          <li className="list-group-item">
            Humidity: <b>{weatherData?.main?.humidity}</b>
          </li>
          <li className="list-group-item">
            Wind:{' '}
            <b>
              {weatherData?.wind?.speed} m/s {getWindDirection(weatherData?.wind?.deg)}
            </b>
          </li>
          <li className="list-group-item">
            <form aria-label="search-form" className="form-inline">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  autoComplete="off"
                  placeholder="City"
                  required
                />
                <SearchButton />
              </div>
            </form>
          </li>
        </ul>
      </div>
    </div>
  )
}
