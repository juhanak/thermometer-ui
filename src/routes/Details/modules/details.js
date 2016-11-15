import fetch from 'isomorphic-fetch'
import { API_URL } from '../../../constants.js'

export const LOAD_TEMPERATURES = 'LOAD_TEMPERATURES'

export function loadTemperatures (value) {
  return {
    type    : LOAD_TEMPERATURES,
    payload : value
  }
}

export const loadTemperaturesAsync = (device) => {
  return dispatch => {
    let url = API_URL + 'getTemperatures?deviceId=' + device
    return fetch(url)
    .then(respose => respose.json())
    .then(json => {
      dispatch(loadTemperatures(json.data))
    })
  }
}

export const actions = {
  loadTemperaturesAsync
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOAD_TEMPERATURES] : (state, action) => action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0
export default function detailsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
