import { turnOnGlobalIndicator, turnOffGlobalIndicator } from 'actions/activityIndicators'

export default (store, dispatch) => ({
  path: 'preferences',
  onEnter: (nextState, replace) => {
    dispatch(turnOnGlobalIndicator())
    analytics.page('App Preferences')
  },
  getComponent(nextState, cb) {
    require.ensure([], require => {
      dispatch(turnOffGlobalIndicator())
      cb(null, {
        main: require('containers/Preferences').default,
        sidebar: require('modules/' + nextState.params.type + '/components/Sidebar').default,
      })
    })
  },
  indexRoute: {
    component: require('components/AppConfiguration').default,
  },
  childRoutes: [
    {
      path: 'specific',
      getComponents(nextState, cb) {
        require.ensure([], require => {
          dispatch(turnOffGlobalIndicator())
          cb(null, require('modules/' + nextState.params.type + '/components/Settings').default)
        })
      },
    },
    {
      path: 'delete',
      getComponents(nextState, cb) {
        require.ensure([], require => {
          dispatch(turnOffGlobalIndicator())
          cb(null, require('components/AppDelete').default)
        })
      },
    },
  ],
})
