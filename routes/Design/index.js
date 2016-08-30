import { setCurrentAppChecksum } from 'actions/apps'
import { fetchStyles, fetchJsonTest } from 'actions/styles'

// module.exports = {
export default (store, dispatch) => ({
	path: '/d/apps/:type/:checksum/design',
	getComponent(nextState, cb) {
		require.ensure([], require => {
			cb(null, require('containers/Design').default)
		})
	},
	onEnter: (nextState, replace, next) => {
		dispatch(setCurrentAppChecksum(nextState.params.checksum)).then(() => {
			dispatch(fetchStyles()).then(() => {
				dispatch(fetchJsonTest()).then(() => {
					next()
				})
			})
		})
	},
// }
})