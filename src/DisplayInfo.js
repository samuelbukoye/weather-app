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
            <div className='cell-detail'>temperature</div>
            <div className='cell-detail'>min/max</div>
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
        return(
            <section key={index} className='weather-detail'>
                <div className='icon'><img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="" /></div>
                <div className='cell-header'>{weekday}</div>
                <div className='cell-detail'>{day.temp.day}<sup>o</sup>C</div>
                <div className='cell-detail'>{day.temp.min}<sup>o</sup>/{day.temp.max}<sup>o</sup></div>
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
        return(
            <section key={index} className='weather-detail'>
                <div className='icon'><img src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} alt="" /></div>
                <div className='cell-header'>{weekday}</div>
                <div className='cell-header'>{date.hourOfDay}:{date.minuiteOfHour} {date.suffix}</div>
                <div className='cell-detail'>{hour.temp}<sup>o</sup>C</div>
                <div className='cell-detail'>{hour.humidity}%</div>
                <div className='cell-detail'>{hour.wind_speed}m/s</div>
                <div className='cell-detail'>{hour.weather[0].description}</div>
            </section>
        )
   });
    
    return showHourly ?  (
            <div>
                <SwitchButton stateChanger={this.stateChanger} showHourly={showHourly} />
                <div className="flex container">
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
                <div className="flex container">
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
