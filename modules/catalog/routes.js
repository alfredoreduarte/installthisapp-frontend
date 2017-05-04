import { fetchEntities } from 'modules/catalog/actions/entities'

export default (store, dispatch) => ({
	getChildRoutes(partialNextState, cb) {
		require.ensure([], (require) => {
			cb(null, [
				{
					path: 'products',
					onEnter: (nextState, replace, next) => {
						dispatch(fetchEntities(nextState.params.checksum))
							.then(() => {
								next()
							})
					},
					getComponents(nextState, cb) {
						require.ensure([], require => {
							cb(null, {
								main: require('modules/catalog/containers/Products').default,
								sidebar: require('modules/catalog/components/Sidebar').default,
							})
						})
					}				
				},
				{
					path: 'products/create',
					onEnter: (nextState, replace, next) => {
						dispatch(fetchEntities(nextState.params.checksum))
							.then(() => {
								next()
							})
					},
					getComponents(nextState, cb) {
						require.ensure([], require => {
							cb(null, {
								main: require('modules/catalog/containers/ProductCreate').default,
								sidebar: require('modules/catalog/components/Sidebar').default,
							})
						})
					}				
				},
				{
					path: 'products/edit/:productId',
					onEnter: (nextState, replace, next) => {
						dispatch(fetchEntities(nextState.params.checksum))
							.then(() => {
								next()
							})
					},
					getComponents(nextState, cb) {
						require.ensure([], require => {
							cb(null, {
								main: require('modules/catalog/containers/ProductEdit').default,
								sidebar: require('modules/catalog/components/Sidebar').default,
							})
						})
					}				
				},
				{
					path: 'media',
					onEnter: (nextState, replace, next) => {
						dispatch(fetchEntities(nextState.params.checksum))
							.then(() => {
								next()
							})
					},
					getComponents(nextState, cb) {
						require.ensure([], require => {
							cb(null, {
								main: require('modules/catalog/containers/Media').default,
								sidebar: require('modules/catalog/components/Sidebar').default,
							})
						})
					}				
				},
				{
					path: 'categories(/create)',
					onEnter: (nextState, replace, next) => {
						dispatch(fetchEntities(nextState.params.checksum))
							.then(() => {
								next()
							})
					},
					getComponents(nextState, cb) {
						require.ensure([], require => {
							cb(null, {
								main: require('modules/catalog/containers/Categories').default,
								sidebar: require('modules/catalog/components/Sidebar').default,
							})
						})
					}				
				},
				{
					path: 'categories/new',
					getComponents(nextState, cb) {
						require.ensure([], require => {
							cb(null, {
								main: require('modules/catalog/containers/Categories').default,
								sidebar: require('modules/catalog/components/Sidebar').default,
							})
						})
					}				
				},
				{
					path: 'categories/edit/:categoryId',
					getComponents(nextState, cb) {
						require.ensure([], require => {
							cb(null, {
								main: require('modules/catalog/containers/Categories').default,
								sidebar: require('modules/catalog/components/Sidebar').default,
							})
						})
					}				
				},
			])
		})
	},
})