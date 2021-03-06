import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import defaultImages from 'lib/defaultImages'
import testUsers from 'lib/testUsers'

import { getFilteredEntries } from 'modules/capture_the_flag/selectors/entries'

// Screens
import Welcome from 'canvas/capture_the_flag/components/Welcome'
import Index from 'canvas/capture_the_flag/components/Index'
import Captcha from 'canvas/capture_the_flag/components/Captcha'

const currentWinner = {
	user: testUsers[0],
}

const topUsers = [
	{
		id: 1,
		elapsedSeconds: 1231,
		user: testUsers[0],
	},
	{
		id: 2,
		elapsedSeconds: 1231,
		hasFlag: true,
		user: testUsers[1],
	},
	{
		id: 3,
		elapsedSeconds: 1231,
		user: testUsers[2],
	},
	{
		id: 4,
		elapsedSeconds: 1231,
		user: testUsers[3],
	},
]

const Previews = ({ screen, messages, images, settings, entries, emptyFunc }) => {
	switch (screen) {
		case 'intro':
			return <Welcome messages={messages} images={images} settings={settings} isPreview={true} captchaPath={null} />
		case 'index':
			return (
				<Index
					messages={messages}
					images={images}
					settings={settings}
					isPreview={true}
					timer={'03:14:16'}
					isItMe={false}
					currentWinner={currentWinner}
					logged={false}
					captchaPath={null}
					entries={entries}
				/>
			)
		case 'captcha':
			return (
				<Captcha
					messages={messages}
					images={images}
					settings={settings}
					isPreview={true}
					entries={entries}
					shuffledCaptcha={[images.captcha.incorrect[0], images.captcha.correct, images.captcha.incorrect[1]]}
				/>
			)
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
		//
		entries: getFilteredEntries(state).length > 0 ? getFilteredEntries(state) : topUsers,
	}
}

const mapDispatchToProps = dispatch => ({
	emptyFunc: () => {},
})

Previews.propTypes = {
	screen: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Previews)
