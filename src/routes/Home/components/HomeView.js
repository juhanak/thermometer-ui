import React from 'react'
import Thermometer from '../assets/thermometer-300px.png'
import './HomeView.scss'

export const HomeView = () => (
  <div>
    <h4>Welcome to sample how to load temperature data from Azure!</h4>
    <img
      className='thermo'
      src={Thermometer} />
  </div>
)

export default HomeView
