import { connect } from 'react-redux'
import { loadDevicesAsync } from '../modules/devices'
import { createSelector } from 'reselect'

import Devices from '../components/Devices'

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
