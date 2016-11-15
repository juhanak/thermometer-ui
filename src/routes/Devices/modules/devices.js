import fetch from 'isomorphic-fetch'
import { API_URL } from '../../../constants.js'

export const LOAD_DEVICES = 'LOAD_DEVICES'

export function loadDevices (value) {
  return {
    type    : LOAD_DEVICES,
    payload : value
  }
}

export const loadDevicesAsync = () => {
  return dispatch => {
    let url = API_URL + 'getDevices'
    return fetch(url)
    .then(respose => respose.json())
    .then(json => {
      dispatch(loadDevices(json.data))
    })
  }
}

export const actions = {
  loadDevicesAsync
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOAD_DEVICES] : (state, action) => action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0
export default function devicesReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
