import React from 'react';
import './Hourly.css';


const Hourly = ({hourly, dateBuilder}) => {
    

    /*
        datebuilder returns
        {
            secondOfMinuite,
            minuiteOfHour,
            hourOfDay,
            suffix
            dayOfWeek,
            dayOfMonth,
            monthNoOfYear,
            monthOfYear,
            year
      }
      */
   let details = hourly.map((hour,index) => {
        let date = dateBuilder(hour.dt)
        return(
            <section key={index} className='weather-detail'>
                    <div className='icon'><img src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} alt="" /></div>
                    <div className='header'>{date.monthNoOfYear}/{date.dayOfMonth}</div>
                    <div className='header'>{date.hourOfDay}:{date.minuiteOfHour} {date.suffix}</div>
                    <div className='others'>{hour.temp}<sup>o</sup>C</div>
                    <div className='others'>{hour.humidity}%</div>
                    <div className='others'>{hour.wind_speed}m/s</div>
                    <div className='others'>{hour.weather[0].description}</div>
            </section>
        )
   });
   return (
        <div>
                <h3>48 hour weather prediction</h3>
                <div className="weather t-container">
                    <section className="weather-title">
                        <div className='icon'></div>
                        <div className='header'></div>
                        <div className='header'></div>
                        <div className='others'>temperature</div>
                        <div className='others'>humidity</div>
                        <div className='others'>wind speed</div>
                        <div className='others'>weather</div>
                    </section>
                    <div className="weather-details crop">
                        <div  className="t-container" id="weatherDetails">
                            {details}
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Hourly;
