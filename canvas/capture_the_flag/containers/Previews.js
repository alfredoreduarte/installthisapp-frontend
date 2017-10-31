import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import defaultImages from 'lib/defaultImages'

// Screens
import Welcome from 'canvas/capture_the_flag/components/Welcome'
import Index from 'canvas/capture_the_flag/components/Index'
import Captcha from 'canvas/capture_the_flag/components/Captcha'
import Claimed from 'canvas/capture_the_flag/components/Claimed'

const currentWinner = {
	identifier: 10211176012778316,
	name: 'Alfredo Re',
}

const topUsers = [
	{
		id: 1,
		elapsedSeconds: 1231,
		user: currentWinner,
	},
	{
		id: 2,
		elapsedSeconds: 1231,
		user: currentWinner,
	},
	{
		id: 3,
		elapsedSeconds: 1231,
		user: currentWinner,
	},
	{
		id: 4,
		elapsedSeconds: 1231,
		user: currentWinner,
	},
	{
		id: 5,
		elapsedSeconds: 1231,
		user: currentWinner,
	},
	{
		id: 6,
		elapsedSeconds: 1231,
		user: currentWinner,
	},
	{
		id: 7,
		elapsedSeconds: 1231,
		user: currentWinner,
	},
]

const Previews = ({ screen, messages, images, settings, emptyFunc }) => {
	switch (screen) {
		case 'intro':
			return <Welcome messages={messages} images={images} settings={settings} captchaPath={null} />
		case 'index':
			return <Index messages={messages} images={images} settings={settings} currentWinner={currentWinner} entries={topUsers} />
		case 'captcha':
			return <Captcha messages={messages} images={images} settings={settings} entries={topUsers} />
		case 'claimed':
			return <Claimed messages={messages} images={images} settings={settings} currentWinner={currentWinner} entries={topUsers} />
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
			welcome: state.form.formEditor.values.images.welcome || defaultImages.welcome,
			header: state.form.formEditor.values.images.header || defaultImages.header,
		},
		settings: state.form.formEditor.values.settings,
	}
}

const mapDispatchToProps = dispatch => ({
	emptyFunc: () => {},
})

Previews.propTypes = {
	screen: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Previews)
