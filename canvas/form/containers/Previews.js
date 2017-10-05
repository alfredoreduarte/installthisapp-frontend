import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

// Screens
import Welcome from 'canvas/form/components/Welcome'
import Form from 'canvas/form/components/Form'
import Thanks from 'canvas/form/components/Thanks'

const Previews = ({ screen, messages, images, settings, schema, emptyFunc }) => {
	switch (screen) {
		case 'intro':
			return <Welcome
				messages={messages}
				images={images}
				settings={settings}
				formPath={null}
			 />
		case 'form':
			return <Form
				messages={messages}
				images={images}
				settings={settings}
				schema={schema}
				handleSubmit={emptyFunc}
			 />
		case 'thanks':
			return <Thanks
				messages={messages}
				images={images}
				settings={settings}
			 />
		default: 
			return <div>empty</div>
	}
}

const mapStateToProps = (state, props) => {
	return {
		screen: state.styles.screen,
		messages: state.form.formEditor.values.messages,
		images: {
			...state.form.formEditor.values.images,
			welcome: state.form.formEditor.values.images.welcome || 'https://s3-us-west-2.amazonaws.com/installthisapp/intro.jpg',
			header: state.form.formEditor.values.images.header || 'https://s3-us-west-2.amazonaws.com/installthisapp/header.jpg',
		},
		settings: state.form.formEditor.values.settings,
		schema: state.form.formEditor.values.schema,
	}
}

const mapDispatchToProps = dispatch => ({
	emptyFunc: () => {}
})

Previews.screens = [
	{ value: 'intro', label: 'Welcome Screen'},
	{ value: 'form', label: 'Form'},
	{ value: 'thanks', label: '"Thank You" screen'},
	// { value: 'upload', label: 'Upload Form'},
	// { value: 'single', label: 'Individual Photo'},
]

Previews.propTypes = {
	screen: PropTypes.string.isRequired,
	messages: PropTypes.object.isRequired,
	images: PropTypes.object.isRequired,
	settings: PropTypes.object.isRequired,
	formPath: PropTypes.string,
}

export default connect(mapStateToProps, mapDispatchToProps)(Previews)