module.exports = {
  path: 'upgrade',
  onEnter: (nextState, replace) => {},
  getComponent(nextState, cb) {
    require.ensure([], require => {
      cb(null, require('containers/Plans').default)
    })
  },
}
