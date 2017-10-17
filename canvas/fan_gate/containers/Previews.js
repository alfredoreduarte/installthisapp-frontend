import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import defaultImages from 'lib/defaultImages'

// Screens
import Welcome from 'canvas/fan_gate/components/Welcome'
import Flyer from 'canvas/fan_gate/components/Flyer'

const Previews = ({ screen, messages, images, settings, emptyFunc }) => {
	switch (screen) {
		case 'intro':
			return <Welcome
				messages={messages}
				images={images}
				settings={settings}
				nextPath={null}
			 />
		case 'flyer':
			return <Flyer
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
		screen: state.formEditorUI.editorScreens[state.formEditorUI.screen].value,
		messages: state.form.formEditor.values.messages,
		images: {
			...state.form.formEditor.values.images,
			welcome: state.form.formEditor.values.images.welcome || defaultImages.header,
			flyer: state.form.formEditor.values.images.flyer || defaultImages.welcome,
		},
		settings: state.form.formEditor.values.settings,
	}
}

const mapDispatchToProps = dispatch => ({
	emptyFunc: () => {}
})

Previews.propTypes = {
	screen: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Previews)