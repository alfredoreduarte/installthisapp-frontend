export const receiveEntities = entities => ({
	type: 'RECEIVE_ENTITIES',
	response: {
		entities
	}
})

// export const fetchEntities = () => {
// 	return dispatch =>
// 		getFromApi('admin_users/show.json').then( response => {
// 			const normalized = normalize(camelizedJson, schema.entities)
// 			dispatch(receiveEntities(normalized.entities))
// 		})
// }