import React from 'react';
import './Current.css';

const Current = ({today, dateBuilder}) => {
    

    /*
        datebuilder returns
        {
            secondOfMinuite,
            minuiteOfHour,
            hourOfDay,
            suffix
            dayOfWeek,
            dayOfMonth,
            monthOfYear,
            year
      }
    */
    let now = dateBuilder(today.dt)
    let sunrise = dateBuilder(today.sunrise)
    let sunset = dateBuilder(today.sunset)
    // temperature - in celsius
    let temperature = today.temp
    // wind_speed - in m/s
    let humidity = today.humidity
    let windSpeed = today.wind_speed
    let { main, description, icon } = today.weather[0]

    return (
        <div className='main'>
            <h1>Current Weather Condition</h1>
            <div>
                <h3> Today {now.dayOfWeek}, {now.monthOfYear} {now.dayOfMonth}</h3>
                <p>as of {now.hourOfDay}:{now.minuiteOfHour} {now.suffix}</p>
                
                <section className="display-weather">
                    <div className="weather-main">
                        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather-icon" />
                        <p>{main}</p>
                        <h2>{temperature}<sup>o</sup>C</h2>
                    </div>
                    <div className="weather-info">
                        <p>{description}</p>
                        <p>humidity : {humidity}%</p>
                        <p>wind speed : {windSpeed}m/s</p>
                        <p>sunrise at {sunrise.hourOfDay}:{sunrise.minuiteOfHour} {sunrise.suffix}
                            <br/>
                            sunset at {sunset.hourOfDay}:{sunset.minuiteOfHour} {sunset.suffix}
                        </p>
                    </div>
                </section>
            </div>

        </div>
    )
}

export default Current;
