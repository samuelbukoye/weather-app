import React, { Component } from 'react';
import './App.css';
import Current from './Current';
import DisplayInfo from './DisplayInfo';
import Switch from './Switch';
// import {json} from './json_response'

class App extends Component {
  constructor () {
    super()
    this.state = {
      weatherJson : {},
      loading : true,
      error:undefined,
      errorMessage:'',
      testing:'',
      displayCelsius:true
    }
  }
  componentDidMount(){
    const getPosition=(position)=>{
      let lat=position.coords.latitude
      let lon=position.coords.longitude
      let myKey = '127d9e2cd99015fdd06f93737e4b535b'
      let link = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${myKey}`
      
      
      fetch(link)
      .then (response=>{
        if (!response.ok) { throw response }
          return  response.json()
      })
      .then(weatherJson=> {
        let testing = 'SUCCESS!!! : BUT BRO ... IT AINT HANDLED YET'
        this.setState({
          error:false,
          loading:false,
          weatherJson,
          testing
        });
      })
    }

    navigator.geolocation.getCurrentPosition(getPosition)
    // this.setState({
    //   error:false,
    //   loading:false,
    //   weatherJson:json,
    //   testing:'dope'
    // });
  }

  render(){
    let { weatherJson,loading,displayCelsius } = this.state
    let setDisplayCelsius=()=>{
      this.setState({
        displayCelsius:displayCelsius?false:true
      })
    }
    let toFarenheit=(celsius)=>{
      let farenheit = (celsius*9/5) +32
      return farenheit
    }
    const dateBuilder=(d)=>{
      d = new Date(d*1000)

      const hourConverter=(hours)=>{
        return hours<=12 ? {
            hourOfDay: timeConverter(hours),
            suffix : 'am'
          } : {
            hourOfDay: timeConverter(hours-12),
            suffix : 'pm'
          }
      }
      const timeConverter =(seconds) =>{
        return seconds<10 ? '0'+seconds : seconds
      }

      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octomber", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      
      let secondOfMinuite = timeConverter(d.getSeconds())
      let minuiteOfHour = timeConverter(d.getMinutes())
      let {hourOfDay,suffix} = hourConverter(d.getHours())
      let dayOfWeek = days[d.getDay()];
      let dayOfMonth = d.getDate();
      let monthNoOfYear = timeConverter(d.getMonth());
      let monthOfYear = months[d.getMonth()];
      let year = d.getFullYear()
      
  
      return {
        secondOfMinuite,
        minuiteOfHour,
        hourOfDay,
        suffix,
        dayOfWeek,
        dayOfMonth,
        monthNoOfYear,
        monthOfYear,
        year
      }
    }
    return(
      <div>
        <header style={{backgroundColor:"#11080d",width:"100%",height:"120px",position:"fixed",top:"0px",zIndex:"100"}}>
          <h1 style={{fontFamily:"Algerian",color:"#b6d2f3",display:"flex",justifyContent:"center",marginTop:"0px"}}>AuthWeather</h1>
          <div style={{display:"flex"}}>
            <div style={{width:"100px", marginLeft:'auto',marginRight:"20px"}}>
                <Switch firstValue={<span><sup>o</sup>C</span>} secondValue={<span><sup>o</sup>F</span>} switchFunc={setDisplayCelsius} boolValue={displayCelsius} />
            </div>
          </div>
        </header>
        {!loading ? (
          <main 
            style={{
              marginTop:"120px",
              padding:"0px 10px",
              backgroundColor:"#11080d80",
              fontFamily:"'Open Sans', sans-serif",}}
              >
            <Current toFarenheit={toFarenheit} displayCelsius={displayCelsius} today={weatherJson.current} dateBuilder={dateBuilder}/>
            <DisplayInfo toFarenheit={toFarenheit} displayCelsius={displayCelsius} hourly={weatherJson.hourly} daily={weatherJson.daily} dateBuilder={dateBuilder}/>
            
          </main>
        ) : (
          <h2 style={{color:'blue'}}>Loading</h2>
        )}
      </div>
    )
  }
}

export default App;

