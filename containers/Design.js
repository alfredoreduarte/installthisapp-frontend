import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getDeclarationsForCurrentSelector as getDeclarations } from 'selectors/styles'
import { 
	setCurrentScreen,
	modifyWholeSheet, 
	saveStyles, 
	setPlatform, 
	setHoveredSelector, 
	resetMouseTrap,
	resetActiveSelector, 
	setActiveSelector,
} from 'actions/styles'
import Canvas from 'components/design-editor/Canvas'
import Sidebar from 'components/design-editor/Sidebar'
import Header from 'components/design-editor/Header'
import Tabs from 'components/design-editor/Tabs'
import BottomBar from 'components/design-editor/BottomBar'
import PlatformSelector from 'components/design-editor/PlatformSelector'
import ResetButton from 'components/design-editor/ResetButton'
import ScreenSelector from 'components/design-editor/ScreenSelector'
import ToolSet from 'components/design-editor/ToolSet'
import Tool from 'components/design-editor/Tool'

// Provisorio
import PreviewsTrivia from 'canvas/trivia/containers/Previews'
import PreviewsPhotoContest from 'canvas/photo_contest/containers/Previews'
// Provisorio

const screens = {
	trivia: PreviewsTrivia.screens,
	photo_contest: PreviewsPhotoContest.screens,
}

const Design = ({
	saving,
	platform,

	// Sidebar
	declarations,
	handleChange, 
	handleSave,
	handleClose,

	// Tabs
	componentsOrBody,
	showBody,
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
		<Canvas previews={previews} platform={platform} fakeState={{state: 'fakeStateTakenFromArrayOfStates'}} />
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
			/>
			<ToolSet>
				{declarations.map( declaration => 
					<Tool 
						key={declaration.property}
						property={declaration.property}
						value={declaration.value}
						handleChange={handleChange} />
				)}
			</ToolSet>
		</Sidebar>
		<BottomBar>
			{false ? <ResetButton handleReset={resetToDefaults} /> : null}
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
	return {
		saving: state.activityIndicators.savingDesign,
		platform: state.styles.platform,
		componentsOrBody: state.styles.componentsOrBody,
		declarations: getDeclarations(state),
		screens: screens[props.params.type],
		previews: props.params.type,
		currentScreen: state.styles.screen,
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	handleChange: (property, value) => dispatch(modifyWholeSheet(property, value)),
	handleSave: () => dispatch(saveStyles()),
	handleClose: () => dispatch(push(`/d/apps/${props.params.type}/${props.params.checksum}`)),
	showBody: val => dispatch(setActiveSelector(['body'])),
	resetSidebar: () => dispatch(resetActiveSelector()),
	handleScreenChange: e => {
		dispatch(resetMouseTrap())
		dispatch(setCurrentScreen(e.value))
	},
	handlePlatformChange: platform => dispatch(setPlatform(platform)),
	resetToDefaults: () => console.log('reset to defaults!'),
})

export default connect(mapStateToProps, mapDispatchToProps)(Design)