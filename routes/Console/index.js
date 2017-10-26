module.exports = {
  path: '/d/console',
  onEnter: (nextState, replace) => {},
  getComponent(nextState, cb) {
    require.ensure([], require => {
      cb(null, require('containers/Console').default)
    })
  },
  indexRoute: {
    component: require('components/Console').default,
  },
}
