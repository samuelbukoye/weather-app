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
      errorMessageMain:'Error!!!',
      errorMessageDetail:'Oh No!!',
      displayCelsius:true,
      positionGotten:true,
      positionErrorText:'',
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
      .catch(err=>{
        if (typeof err.text === 'function') {
          err.text()
          .then(errorMessage => {
            this.setState({
              loading:false,
                error:true,
                errorMessageMain:'Error!!!',
                errorMessageDetail:errorMessage
              })
            });
          }else{
            let errorMessageMain='TypeError: Failed To Fetch!!!'
            let errorMessageDetail='This is most probably due to a connection problem \n Make sure you have a stable connection, then refresh'
            
              this.setState({
                loading:false,
                error:true,
                errorMessageMain,
                errorMessageDetail
              })
            }
          })
        }
    const errorCallback=()=>{
      let positionErrorMessage='Do note that you need to allow this browser to access your location to get the best out of this site'
        this.setState({
          positionGotten:false,
          positionErrorMessage,
          loading:false,
          error:true,
          errorMessageMain:'Data Fetch Error!!',
          errorMessageDetail:''
        })
    }

        if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(getPosition,errorCallback,{timeout:5000})
        }else{
          let positionErrorMessage='Geolocation is not supported by your browser'
          this.setState({
            positionGotten:false,
            positionErrorMessage,
            loading:false,
            error:true,
            errorMessageMain:'Data Fetch Error!!!',
            errorMessageDetail:''
          })
        }
        // this.setState({
          //   error:false,
          //   loading:false,
    //   weatherJson:json,
    // });
  }
  
  render(){
    let { 
      positionGotten,
      positionErrorMessage,
      error,
      errorMessageMain,
      errorMessageDetail,
      weatherJson,
      loading,
      displayCelsius,
      } = this.state
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
        <div
          style={{
            marginTop:"120px",
            padding:"0px 10px",
            backgroundColor:"#11080d80",
            fontFamily:"'Open Sans', sans-serif",
          }}
          >
          {
            !positionGotten?(
                <div>
                  <h2 style={{color:'red',fontSize:'30px',lineHeight:'60px'}}>
                    Unable To Get Your Location!!!
                  </h2>
                  <div style={{textAlign:'center',fontSize:'20px',lineHeight:'30px'}}>
                    {positionErrorMessage}
                  </div>
                </div>
              ):('')
          }
          {!loading ? (
            !error?(
              <main>
                <Current toFarenheit={toFarenheit} displayCelsius={displayCelsius} today={weatherJson.current} dateBuilder={dateBuilder}/>
                <DisplayInfo toFarenheit={toFarenheit} displayCelsius={displayCelsius} hourly={weatherJson.hourly} daily={weatherJson.daily} dateBuilder={dateBuilder}/>
              </main>
            ):(
              <div>
                <h2 style={{color:'red',fontSize:'30px',lineHeight:'60px'}}>
                  {errorMessageMain}
                </h2>
                <p style={{textAlign:'center',fontSize:'20px',lineHeight:'30px'}}>
                  {errorMessageDetail}
                </p>
              </div>
            )
          ):(
              <div>
                <h2 style={{color:'blue'}}>Getting Data...</h2>
              </div>
          )}
        </div>
      </div>
    )
  }
}
                
export default App;