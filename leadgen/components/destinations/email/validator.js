const validator = ( values, errors ) => {
	if (values.settings === undefined) {
		errors.settings = {
			recipients: 'Required'
		}
	} else if (!values.settings.recipients) {
		errors.settings.recipients = 'Required'
	}
	return errors
}

export default validator