import { fetchEntities } from 'modules/coupons/actions/entities'
import { turnOnGlobalIndicator, turnOffGlobalIndicator } from 'actions/activityIndicators'

export default (store, dispatch) => ({
  getChildRoutes(partialNextState, cb) {
    require.ensure([], require => {
      cb(null, [
        {
          path: 'vouchers(/:action)',
          onEnter: (nextState, replace, next) => {
            if (nextState.params.action && nextState.params.action != 'create') {
              const { type, checksum } = nextState.params
              replace({
                pathname: `/d/apps/${type}/${checksum}/vouchers`,
              })
            }
            dispatch(turnOnGlobalIndicator())
            dispatch(fetchEntities(nextState.params.checksum)).then(() => {
              next()
            })
          },
          getComponents(nextState, cb) {
            require.ensure([], require => {
              dispatch(turnOffGlobalIndicator())
              cb(null, {
                main: require('modules/coupons/containers/VouchersContainer').default,
                sidebar: require('modules/coupons/components/Sidebar').default,
              })
            })
          },
        },
      ])
    })
  },
})
