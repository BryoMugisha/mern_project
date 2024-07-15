/* eslint-disable no-unused-vars */
import React from 'react'
import './css/Landing.css'
import Navbar from './Navbar'



const Landing = () => {
  return (
    <>
       <Navbar />
    <div className='home'>
        
        <h1 className='home-title'>
            TIMNATH WELLNESS
        </h1>
        <p className='home-description'>
        A unique health strategy that helps you achieve and maintain normal readings using minimal to zero medication.
        </p>
        
    </div>
    </>

  )
}

export default Landing