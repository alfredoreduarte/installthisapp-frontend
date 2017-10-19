import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import defaultImages from 'lib/defaultImages'

// Screens
import Welcome from 'canvas/coupons/components/Welcome'
import Coupon from 'canvas/coupons/components/Coupon'
import NoCoupons from 'canvas/coupons/components/NoCoupons'

const Previews = ({ screen, messages, images, settings, emptyFunc }) => {
	switch (screen) {
		case 'intro':
			return <Welcome
				messages={messages}
				images={images}
				settings={settings}
				isPreview={true}
				handleLogin={emptyFunc}
			 />
		case 'coupon':
			return <Coupon
				messages={messages}
				images={images}
				settings={settings}
				code={'DEMOCODE'}
			 />
		case 'noCoupons':
			return <NoCoupons
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
			welcome: state.form.formEditor.values.images.welcome || defaultImages.welcome,
			header: state.form.formEditor.values.images.header || defaultImages.header,
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