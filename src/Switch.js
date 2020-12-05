import React from 'react';
import './Switch.css'

const Switch=({firstValue,secondValue,switchFunc, boolValue})=>{
    return(
        <div className='main'>
            <div className="wrapper">
                <div className={`taeb-switch text-center ${boolValue?'left': 'right'}`}>
                    <div onClick={boolValue?()=>{return}:switchFunc} className={`taeb ${boolValue?'active': ''}`}>{firstValue}</div>
                    <div onClick={boolValue?switchFunc:()=>{return}} className={`taeb ${boolValue?'': 'active'}`}>{secondValue}</div>
                </div>
            </div>
        </div>
    )
}

export default Switch