import React, { Component } from 'react';
import './App.css';
import Current from './Current';

class App extends Component {
  constructor () {
    super()
    this.state = {
      weatherJson : {},
      loading : true,
      error:undefined,
      errorMessage:'',
      testing:''


    }
  }
  componentDidMount(){
    
    let lat = 0;
    let lon = 4;
    let myKey = '127d9e2cd99015fdd06f93737e4b535b'
    let link = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${myKey}`

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
      // .catch(err => {
      //   // err.text()
      //   //   .then(errorMessage => {
      //       let testing = 'WHOOPS! THIS IS TROUBLE!'
      //       this.setState({
      //         error:true,
      //         errorMessage:err,
      //         testing
      //       });
      //   // })
      // })
  
  }

  render(){
    let { weatherJson,loading } = this.state

    const dateBuilder=(d)=>{
      d = new Date(d*1000)

      const hourConverter=(hours)=>{
        return hours<=12 ? {
            hourOfDay: hours,
            suffix : 'am'
          } : {
            hourOfDay: hours-12,
            suffix : 'pm'
          }
      }
      const timeConverter =(seconds) =>{
        return seconds<=10 ? '0'+seconds : seconds
      }

      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octomber", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      
      let secondOfMinuite = timeConverter(d.getSeconds())
      let minuiteOfHour = timeConverter(d.getMinutes())
      let {hourOfDay,suffix} = hourConverter(d.getHours())
      let dayOfWeek = days[d.getDay()];
      let dayOfMonth = d.getDate();
      let monthOfYear = months[d.getMonth()];
      let year = d.getFullYear()
      
  
      return {
        secondOfMinuite,
        minuiteOfHour,
        hourOfDay,
        suffix,
        dayOfWeek,
        dayOfMonth,
        monthOfYear,
        year
      }
    }
    return !loading ? (
      <div>
        <Current today={weatherJson.current} dateBuilder={dateBuilder}/>
    
      </div>
    ) : (
      <h2>Loading</h2>
    )
  }
}

export default App;

