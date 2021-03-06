import { fetchEntities } from 'modules/promo_code/actions/entities'
import { turnOnGlobalIndicator, turnOffGlobalIndicator } from 'actions/activityIndicators'

export default (store, dispatch) => ({
	getChildRoutes(partialNextState, cb) {
		require.ensure([], require => {
			cb(null, [
				{
					path: 'codes',
					onEnter: (nextState, replace, next) => {
						dispatch(turnOnGlobalIndicator())
						dispatch(fetchEntities(nextState.params.checksum)).then(() => {
							next()
						})
					},
					getComponents(nextState, cb) {
						require.ensure([], require => {
							dispatch(turnOffGlobalIndicator())
							cb(null, {
								main: require('modules/promo_code/containers/Entries').default,
								sidebar: require('modules/promo_code/components/Sidebar').default,
							})
						})
					},
				},
			])
		})
	},
})
