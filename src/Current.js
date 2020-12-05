import React from 'react';
import Switch from './Switch'
import './Current.css';

const Current = ({today, dateBuilder,toFarenheit,setDisplayCelsius,displayCelsius}) => {
    

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
    let temperature = displayCelsius?Math.round(today.temp):Math.round(toFarenheit(today.temp))
    // wind_speed - in m/s
    let humidity = today.humidity
    let windSpeed = today.wind_speed
    let { main, description, icon } = today.weather[0]

    return (
        <div className='main'>
            <div style={{display:"flex"}}>
                <h1>Current Weather Condition</h1>
                <div style={{width:"100px", marginLeft:'auto'}}>
                    <Switch firstValue={<span><sup>o</sup>C</span>} secondValue={<span><sup>o</sup>F</span>} switchFunc={setDisplayCelsius} boolValue={displayCelsius} />
                </div>
            </div>
            
            <div>
                <h3> Today {now.dayOfWeek}, {now.monthOfYear} {now.dayOfMonth}</h3>
                <p>as of {now.hourOfDay}:{now.minuiteOfHour} {now.suffix}</p>
                
                <section className="display-weather">
                    <div className="weather-main">
                        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather-icon" />
                        <p>{main}</p>
                        <h2>{temperature}<sup>o</sup>{displayCelsius?'C':'F'}</h2>
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
