const validator = ( values, errors ) => {
	if (values.settings === undefined) {
		errors.settings = {
			listId: 'Required',
			apiKey: 'Required',
		}
	} 
	else {
		if (!values.settings.apiKey) {
			errors.settings.apiKey = 'Required'
		}
		else if (!values.settings.listId) {
			errors.settings.listId = 'Required'
		}
	}
	return errors
}

export default validator