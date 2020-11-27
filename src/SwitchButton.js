import React from 'react';

const SwitchButton=({stateChanger, showHourly})=>{
    return(
        <div style={{display:'flex',justifyContent:"center"}}>
            <h3 style={{color: 'blue',marginRight:'10px'}}>{showHourly?'48 hour weather prediction':'8 days weather prediction'}</h3>
            <button style={{width:'100px',height:'30px',marginTop:'20px',marginLeft:'10px'}} type="button" onClick={stateChanger}>
                {showHourly?'To Daily': 'To Hourly'}
            </button>
        </div>
    )
}

export default SwitchButton