import React from 'react';
import './Current.css';

const Current = ({today, dateBuilder,toFarenheit,displayCelsius}) => {
    

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
        <div style={{}}>
            <div style={{textAlign:"center"}}>
                <h2>
                    Today {now.dayOfWeek}, {now.monthOfYear} {now.dayOfMonth}
                </h2>
                <h4 style={{fontStyle: "italic"}}>
                    as of {now.hourOfDay}:{now.minuiteOfHour} {now.suffix}
                </h4>
                <section style={{display: "flex",flexWrap:"wrap",justifyContent: "center"}}>
                    <div style={{width:"250px"}}>
                        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather-icon" />
                        <p>{main}</p>
                        <h2>{temperature}<sup>o</sup>{displayCelsius?'C':'F'}</h2>
                    </div>
                    <div style={{fontStyle: "italic",width:"250px"}}>
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
