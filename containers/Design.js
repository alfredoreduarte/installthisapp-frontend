import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getDeclarationsForCurrentSelector as getDeclarations } from 'selectors/styles'
import { getCurrentMessageKey, getCurrentMessageValue } from 'selectors/styles'
import { 
	resetDefaultStyles,
	setCurrentScreen,
	modifyWholeSheet, 
	setCurrentMessage, 
	editMessage, 
	editImage, 
	saveStyles, 
	setPlatform, 
	setHoveredSelector, 
	resetMouseTrap,
	resetActiveSelector, 
	setContentEditor,
	setActiveSelector,
} from 'actions/styles'
import Canvas from 'components/design-editor/Canvas'
import Sidebar from 'components/design-editor/Sidebar'
import Header from 'components/design-editor/Header'
import Tabs from 'components/design-editor/Tabs'
import BottomBar from 'components/design-editor/BottomBar'
import PlatformSelector from 'components/design-editor/PlatformSelector'
import ResetButton from 'components/design-editor/ResetButton'
import ImageUploader from 'components/design-editor/ImageUploader'
import ScreenSelector from 'components/design-editor/ScreenSelector'
import ToolSet from 'components/design-editor/ToolSet'
import Tool from 'components/design-editor/Tool'
import TextContent from 'components/design-editor/TextContent'

// Provisorio
import PreviewsTrivia from 'canvas/trivia/containers/Previews'
import PreviewsPhotoContest from 'canvas/photo_contest/containers/Previews'
import PreviewsTopFans from 'canvas/top_fans/containers/Previews'
// Provisorio

const screens = {
	trivia: PreviewsTrivia.screens,
	photo_contest: PreviewsPhotoContest.screens,
	top_fans: PreviewsTopFans.screens,
}

const Design = ({
	saving,
	platform,
	setEditingMessage,

	// Sidebar
	messagesDictionary,
	imagesDictionary,
	// 
	currentMessageKey,
	currentMessageValue,
	handleMessageChange, 
	handleImageChange, 
	declarations,
	handleChange, 
	handleSave,
	handleClose,

	// Tabs
	componentsOrBody,
	showBody,
	showContentEditor,
	resetSidebar,

	// Screen Selector
	screens,
	previews,
	currentScreen,
	handleScreenChange,

	// Platform Selector
	handlePlatformChange,

	// Reset design
	resetToDefaults,
}) => (
	<div>
		<Canvas 
			previews={previews} 
			setEditingMessage={setEditingMessage} 
			platform={platform} />
		<Sidebar>
			<Header
				handleClose={handleClose}
				handleSave={handleSave}
				busy={saving}
			/>
			<Tabs
				componentsOrBody={componentsOrBody}
				showBody={showBody}
				resetSidebar={resetSidebar}
				showContentEditor={showContentEditor}
			/>
			<ToolSet>
				{componentsOrBody == 'content' ?
					<div>
						<h4><u>Images</u></h4>
						{imagesDictionary.map( image =>
							<div key={image.key}> 
							 <ImageUploader 
							 	imgOrBackground="img"
							 	property={image.key} 
							 	onChange={val => handleImageChange(image.key, val)} 
							 	value={image.value} 
							 />
							 <br/>
							 </div>
						)}
						<hr/>
						<h4><u>Texts</u></h4>
						{messagesDictionary.map( message => 
							<TextContent 
								key={message.key}
								keyString={message.key}
								value={message.value}
								onChange={handleMessageChange}
							 />
						)}
					</div>
				: null}
				{currentMessageKey && componentsOrBody == 'content' && false ? 
					<TextContent 
						keyString={currentMessageKey}
						value={currentMessageValue}
						onChange={handleMessageChange}
					 />
				: null}
				{componentsOrBody != 'content' && declarations.length > 0 ? declarations.map( declaration => 
					<Tool 
						key={declaration.property}
						property={declaration.property}
						value={declaration.value}
						handleChange={handleChange} />
				) : null}
			</ToolSet>
		</Sidebar>
		<BottomBar>
			<ResetButton handleReset={resetToDefaults} />
			<ScreenSelector
				value={currentScreen}
				options={screens}
				handleScreenChange={handleScreenChange}	
			 />
			<PlatformSelector platform={platform} handlePlatformChange={handlePlatformChange} />
		</BottomBar>
	</div>
)

const mapStateToProps = (state, props) => {
	var keys = _.keys(state.styles.messages)
	const messages = _.map(keys, k => {
		return {
			key: k,
			value: state.styles.messages[k],
		}
	})
	var imageKeys = _.keys(state.styles.images)
	const images = _.map(imageKeys, k => {
		return {
			key: k,
			value: state.styles.images[k],
		}
	})
	return {
		saving: state.activityIndicators.savingDesign,
		platform: state.styles.platform,
		componentsOrBody: state.styles.componentsOrBody,
		declarations: getDeclarations(state),
		screens: screens[props.params.type],
		previews: props.params.type,
		currentScreen: state.styles.screen,
		// 
		messagesDictionary: messages,
		// 
		imagesDictionary: images,
		// 
		currentMessageKey: getCurrentMessageKey(state),
		currentMessageValue: getCurrentMessageValue(state),
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	setEditingMessage: key => dispatch(setCurrentMessage(key)),
	handleMessageChange: (key, value) => dispatch(editMessage(key, value)),
	handleImageChange: (key, value) => {
		dispatch(editImage(key, value))
		if (value && value !== 'none') {
			dispatch(saveStyles())
		}
	},
	handleChange: (property, value) => dispatch(modifyWholeSheet(property, value)),
	handleSave: () => dispatch(saveStyles()),
	handleClose: () => dispatch(push(`/d/apps/${props.params.type}/${props.params.checksum}`)),
	showBody: val => dispatch(setActiveSelector(['body'])),
	showContentEditor: val => dispatch(setContentEditor()),
	resetSidebar: () => dispatch(resetActiveSelector()),
	handleScreenChange: e => {
		dispatch(resetMouseTrap())
		dispatch(setCurrentScreen(e.value))
	},
	handlePlatformChange: platform => dispatch(setPlatform(platform)),
	resetToDefaults: () => dispatch(resetDefaultStyles()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Design)