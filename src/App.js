import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid={APIKEY}&lang=pt_br&units=metric`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios
        .get(url)
        .then((response) => {
          setData(response.data)
          console.log(url)
          console.log(response.data)
        })
        .catch((error) => (console.log(error.message)));
      setLocation('')
    }
  }

  return (
    <div className="app">
      <div className='search'>
        <input
          value={location}
          type='text'
          onChange={event => setLocation(event.target.value)}
          placeholder='Cidade'
          onKeyPress={searchLocation}
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            {data.name ? <p>{data.name}, <small>{data.sys.country}</small></p> : null}
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}ºC</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>⇣ Mínima: {data.main.temp_min.toFixed()}ºC</p> : null}
            {data.weather ? <p>⇡ Máxima: {data.main.temp_max.toFixed()}ºC</p> : null}
            {
              data.weather ?
                <p>
                  <img src={'https://openweathermap.org/img/wn/' + data.weather[0].icon + '.png'} alt='' />
                  {data.weather[0].description}
                </p>
                : null
            }
          </div>
        </div>
        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>🌡️ {data.main.feels_like.toFixed()}°C</p> : null}
              <p>Sensação</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>💧 {data.main.humidity}%</p> : null}
              <p>Umidade</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>🌬️ {data.wind.speed.toFixed()} MPH</p> : null}
              <p>Vento</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
