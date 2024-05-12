import { SearchButton } from '@/components/search-button'
import getWeather from '@/lib/openweather'
import { getWindDirection } from '@/lib/wind'

const DEFAULT_CITY = 'Copenhagen'

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function App({ params, searchParams }: Props) {
  let weatherData
  try {
    const city = (Array.isArray(searchParams?.city) ? searchParams?.city?.shift() : searchParams?.city) || DEFAULT_CITY
    weatherData = await getWeather(city)
  } catch (e: any) {
    console.error(e.message)
    // TODO: Proper error handing
  }

  return (
    <div className="widget">
      <div className="panel panel-info">
        <div className="panel-heading">
          Weather in <b>{weatherData?.name || ''}</b>
        </div>
        <ul className="list-group">
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
            <form id="search-form" className="form-inline">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  autoComplete="off"
                  defaultValue={weatherData?.name}
                  placeholder="City"
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
