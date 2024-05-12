'use server'

export default async function getWeather(city: string) {
  if (!city) return {}
  const apiKey = '032b6100f98b3d5392916fbf2ae7339c'
  const url = new URL('https://api.openweathermap.org/data/2.5/weather')
  url.search = `?q=${city}&units=metric&appid=${apiKey}`
  console.info(url.href)

  const res = await fetch(url, { cache: 'force-cache' })
  const weatherData = await res.json()

  if (!res.ok) {
    // Should trigger `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return weatherData
}