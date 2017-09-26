const validator = ( values, errors ) => {
	if (values.settings === undefined) {
		errors.settings = {
			url: 'Required',
		}
	} 
	else {
		if (!values.settings.url) {
			errors.settings.url = 'Required'
		}
	}
	return errors
}

export default validator