import React from 'react'
import './Devices.scss'
import { loadDevicesAsync } from '../modules/devices'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { Link } from 'react-router'
export class Devices extends React.Component {

  componentDidMount () {
    this.props.loadDevicesAsync()
  }

  render () {
    return (
      <div style={{ margin: '0 auto' }} >
        <h2>Devices</h2>
        <ul className='dev-list'>
          { this.props.devices.map(device => <li> <Link to={'/details/' + device.iddevice} >{device.iddevice}</Link> </li>) }
        </ul>
      </div>
    )
  }
}

Devices.propTypes = {
  devices     : React.PropTypes.array.isRequired,
  loadDevicesAsync : React.PropTypes.func.isRequired,
  counter : React.PropTypes.number.isRequired
}

const mapDispatchToProps = {
  loadDevicesAsync
}

const getDevices = (state) => state.devices
const deviceCounter = createSelector(getDevices, (devices) => devices.length)

const mapStateToProps = (state) => {
  return ({
    counter : deviceCounter(state),
    devices : state.devices ? state.devices : []
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Devices)
