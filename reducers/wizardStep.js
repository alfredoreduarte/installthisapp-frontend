const wizardStep = (state = 0, action) => {
	switch (action.type) {
		case 'UPDATE_WIZARD_STEP':
			return action.step
		default:
			return state
	}
}

export default wizardStep