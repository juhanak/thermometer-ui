import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'devices',

  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Devices = require('./components/Devices').default
      const reducer = require('./modules/devices').default

      /*  Add the reducer to the store on key 'devices'  */
      injectReducer(store, { key: 'devices', reducer })

      /*  Return getComponent   */
      cb(null, Devices)

    /* Webpack named bundle   */
    }, 'devices')
  }
})
