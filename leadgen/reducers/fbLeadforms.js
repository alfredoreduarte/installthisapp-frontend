// const fbLeadforms = (state = {}, action) => {
// 	switch (action.type) {
// 		case 'FB_LEADFORMS/RECEIVE':
// 			return {...state, ...action.fbLeadforms}
// 		case 'FB_LEADFORMS/REMOVE':
// 			const updated = state.map(fbLeadform => {
// 				if (fbLeadform.id == action.id) {
// 					return {
// 						...fbLeadform,
// 						deleted: true,
// 					}
// 				}
// 				else {
// 					return fbLeadform
// 				}
// 			})
// 			return {...updated}
// 		default:
// 			return state
// 	}
// }

// export default fbLeadforms
