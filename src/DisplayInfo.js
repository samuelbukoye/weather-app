import React, { Component } from 'react';
import SwitchButton from './SwitchButton'
import './DisplayInfo.css';


// const Hourly = ({daily, hourly, dateBuilder}) => {
class DisplayInfo extends Component {
    constructor(props){
        super(props)
        this.state={
            showHourly : true
        }
    }
    
    stateChanger=()=>{
        this.setState({
            showHourly:this.state.showHourly?false:true
        })
    }

    showDay=(date,now)=>{
        if(date.dayOfMonth===now)return 'Today'
        else if (date.dayOfMonth===now+1) return 'Tomorrow'
        else return date.dayOfWeek
    }
   render(){
    let {showHourly} = this.state
    let dateBuilder= this.props.dateBuilder
    let daily= this.props.daily
    let hourly= this.props.hourly
    let now = new Date().getDate()
    
    let dailyTitle = (
        <section className="weather-title">
            <div className='icon'></div>
            <div className='cell-header'></div>
            <div className='cell-detail'>morning</div>
            <div className='cell-detail'>day</div>
            <div className='cell-detail'>evening</div>
            <div className='cell-detail'>night</div>
            <div className='cell-detail'>sunrise</div>
            <div className='cell-detail'>sunset</div>
            <div className='cell-detail'>humidity</div>
            <div className='cell-detail'>wind speed</div>
            <div className='cell-detail'>weather</div>
        </section> 
    )
    let dailyDetails =  daily.map((day,index) => {
        let date = dateBuilder(day.dt)
        let weekday = this.showDay(date,now)
        let sunrise = dateBuilder(day.sunrise)
        let sunset = dateBuilder(day.sunset)
        let morn_temp = Math.round(day.temp.morn)
        let day_temp = Math.round(day.temp.morn)
        let eve_temp = Math.round(day.temp.morn)
        let night_temp = Math.round(day.temp.morn)
        return(
            <section key={index} className='weather-detail'>
                <div className='icon'><img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="" /></div>
                <div className='cell-header'>{weekday}</div>
                <div className='cell-detail'>{morn_temp}<sup>o</sup></div>
                <div className='cell-detail'>{day_temp}<sup>o</sup></div>
                <div className='cell-detail'>{eve_temp}<sup>o</sup></div>
                <div className='cell-detail'>{night_temp}<sup>o</sup></div>
                <div className='cell-detail'>{sunrise.hourOfDay}:{sunrise.minuiteOfHour}</div>
                <div className='cell-detail'>{sunset.hourOfDay}:{sunset.minuiteOfHour}</div>
                <div className='cell-detail'>{day.humidity}%</div>
                <div className='cell-detail'>{day.wind_speed}m/s</div>
                <div className='cell-detail'>{day.weather[0].description}</div>
            </section>
        )
   });
    let hourlyTitle = (
        <section className="weather-title">
        <div className='icon'></div>
        <div className='cell-header'></div>
        <div className='cell-header'></div>
        <div className='cell-detail'>temperature</div>
        <div className='cell-detail'>humidity</div>
        <div className='cell-detail'>wind speed</div>
        <div className='cell-detail'>weather</div>
    </section>  
    )
    let hourlyDetails = hourly.map((hour,index) => {
        let date = dateBuilder(hour.dt)
        let weekday = this.showDay(date,now)
        let hour_temp = Math.round(hour.temp)
        return(
            <section key={index} className='weather-detail'>
                <div className='icon'><img src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} alt="" /></div>
                <div className='cell-header'>{weekday}</div>
                <div className='cell-header'>{date.hourOfDay}:{date.minuiteOfHour} {date.suffix}</div>
                <div className='cell-detail'>{hour_temp}<sup>o</sup></div>
                <div className='cell-detail'>{hour.humidity}%</div>
                <div className='cell-detail'>{hour.wind_speed}m/s</div>
                <div className='cell-detail'>{hour.weather[0].description}</div>
            </section>
        )
   });
    
    return showHourly ?  (
            <div>
                <SwitchButton stateChanger={this.stateChanger} showHourly={showHourly} />
                <div className="flex">
                    {hourlyTitle}
                    <div className="weather-details crop-x">
                        <div  className="flex">
                            {hourlyDetails}
                        </div>
                    </div>
                </div>
            </div>
        ) :  (
            <div>
                <SwitchButton stateChanger={this.stateChanger} showHourly={showHourly} />
                <div className="flex">
                    {dailyTitle}
                    <div className="weather-details crop-x">
                        <div  className="flex">
                            {dailyDetails}
                        </div>
                    </div>
                </div>
            </div>
        ) 
   }
  
}

export default DisplayInfo;
