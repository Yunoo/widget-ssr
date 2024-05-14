export type Props = {
  params?: { id?: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export type WeatherData = {
  coord: Coord
  weather: WeatherInfo[]
  base: string
  main: Main
  visibility: number
  wind: Wind
  clouds: Clouds
  dt: number
  sys: Sys
  timezone: number
  id: number
  name: string
  cod: number
}

export type Coord = {
  lon: number
  lat: number
}

export type WeatherInfo = {
  id: number
  main: string
  description: string
  icon: string
}

export type Main = {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
}

export type Wind = {
  speed: number
  deg: number
}

export type Clouds = {
  all: number
}

export type Sys = {
  type: number
  id: number
  country: string
  sunrise: number
  sunset: number
}
