import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'details/:id',

  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Details = require('./components/Details').default
      const reducer = require('./modules/details').default

      /*  Add the reducer to the store on key 'devices'  */
      injectReducer(store, { key: 'details', reducer })

      /*  Return getComponent   */
      cb(null, Details)

    /* Webpack named bundle   */
    }, 'details')
  }
})
