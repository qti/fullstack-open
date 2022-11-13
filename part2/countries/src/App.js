import { useState, useEffect } from 'react'
import axios from 'axios'

const apiKey = process.env.REACT_APP_API_KEY

const Weather = ({ country }) => {
  const [weather, setWeather] = useState()

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${apiKey}&units=metric`)
      .then(response => {
        console.log('promise fulfilled')
        setWeather(response.data)
      })
  }, [])

  if (!!weather) {
    return (
      <>
        <h1>Weather in {country.name.common}</h1>
        <p>temperature {weather.main.temp} celcius</p>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
        <p>wind {weather.wind.speed} m/s</p>
      </>
    )
  }
}

const Countries = ({ countries, handleButtonClick }) => {
  if (countries.length === 1) {
    const country = countries[0]
    return (
      <>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <h3>languages:</h3>
        <ul>
          {Object.values(country.languages).map((language) => <li key={language}>{language}</li>)}
        </ul>
        <img src={country.flags.png}></img>
        <Weather country={country} />
      </>
    )
  } else if (countries.length <= 10) {
    return (
      <>
        {countries.map((country) =>
          <p key={country.name.common}>
            {country.name.common} <button onClick={() => handleButtonClick(country.name.common)}>show</button>
          </p>
        )}
      </>
    )
  } else if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
}

function App() {
  const [countryFilter, setCountryFilter] = useState('')
  const [countries, setCountries] = useState([])

  const handleButtonClick = (country) => {
    setCountryFilter(country)
  }

  const handleCountryFilter = (event) => {
    setCountryFilter(event.target.value)
  }

  useEffect(() => {
    console.log('query')
    if (!!countryFilter) {
      axios
        .get(`https://restcountries.com/v3.1/name/${countryFilter}`)
        .then(response => {
          console.log('promise fulfilled')
          setCountries(response.data)
        })
    }
  }, [countryFilter])

  return (
    <div className="App">
      <p>find countries</p>
      <input
        value={countryFilter}
        onChange={handleCountryFilter} />
      <Countries countries={countries} handleButtonClick={handleButtonClick} />
    </div>
  );
}

export default App;
