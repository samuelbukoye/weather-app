import React from 'react';
// import './Current.css';

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
    let windSpeed = today.wind_speed
    let { main, description, icon } = today.weather[0]

    return (
        <div>
            <h2>Current Weather Condition</h2>
            <div>
                <h3> Today {now.dayOfWeek}, {now.monthOfYear} {now.dayOfMonth}</h3>
                <p>as of {now.hourOfDay}:{now.minuiteOfHour} {now.suffix}</p>
                <p>{main}</p>
                <br/><br/>
                <section className="display-weather">
                    <div className="weather-info">
                        <h2>{temperature}<sup>o</sup>C</h2>
                        <p>{description}</p>
                        <p>wind speed : {windSpeed}m/s</p>
                    </div>
                    <div className="weather-icon">
                        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather-icon" />
                        <p>sunrise/{sunrise.hourOfDay}:{sunrise.minuiteOfHour} {sunrise.suffix}
                            <br/>
                            sunset/{sunset.hourOfDay}:{sunset.minuiteOfHour} {sunset.suffix}
                        </p>
                    </div>
                </section>
            </div>

        </div>
    )
}

export default Current;
