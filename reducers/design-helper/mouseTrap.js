const mouseTrap = (
	state = {
		x: 0,
		y: 0,
		w: 0,
		h: 0,
	},
	action
) => {
	switch (action.type) {
		case 'UPDATE_COORDS':
			return Object.assign({}, state, {
				x: action.coords.x,
				y: action.coords.y,
				w: action.coords.w,
				h: action.coords.h,
			})
		default:
			return state
	}
}

export default mouseTrap
