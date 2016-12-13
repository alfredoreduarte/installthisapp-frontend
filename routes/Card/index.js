import { fetchAdmin } from 'actions/admin'

export default (store, dispatch) => ({
	getChildRoutes(partialNextState, cb) {
		cb(null, {
			path: 'card',
			onEnter: (nextState, replace, next) => {
				dispatch(fetchAdmin()).then(() => {
					next()
				})
			},
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					// cb(null, {
					// 	main: require('containers/Card').default
					// })
					cb(null, require('containers/Card').default)
				})
			}
		})
	},
})