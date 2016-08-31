import React from 'react'
import { connect } from 'react-redux'
import { getDeclarationsForCurrentSelector as getDeclarations } from 'selectors/styles'
import { modifyWholeSheet, saveStyles, setPlatform } from 'actions/styles'
import Canvas from 'components/design-editor/Canvas'
import Sidebar from 'components/design-editor/Sidebar'
import Header from 'components/design-editor/Header'
import Tabs from 'components/design-editor/Tabs'
import BottomBar from 'components/design-editor/BottomBar'
import PlatformSelector from 'components/design-editor/PlatformSelector'
import ResetButton from 'components/design-editor/ResetButton'
import ScreenSelector from 'components/design-editor/ScreenSelector'
import Tools from 'containers/DesignEditorTools'

const Design = ({
	platform,

	// Sidebar
	declarations,
	handleChange, 
	handleSave,

	// Screen Selector
	screens,
	currentScreen,
	handleScreenChange,

	// Platform Selector
	handlePlatformChange,

	// Reset design
	resetToDefaults,
}) => (
	<div>
		<Canvas platform={platform} />
		<Sidebar>
			<Header
				handleClose={() => console.log('closing editor!')}
				handleSave={handleSave}
				busy={true}
			/>
			<Tabs
				handleTabs={tab => console.log('changed tab!', tab)}
			/>
			<Tools declarations={declarations} handleChange={handleChange} />
		</Sidebar>
		<BottomBar>
			<ScreenSelector
				value={currentScreen}
				options={screens}
				handleScreenChange={handleScreenChange}	
			 />
			<PlatformSelector platform={platform} handlePlatformChange={handlePlatformChange} />
			<ResetButton handleReset={resetToDefaults} />
		</BottomBar>
	</div>
)

const mapStateToProps = state => ({ 
	platform: state.styles.platform,
	declarations: getDeclarations(state),
	screens: [
		{ value: 'index', label: 'Inicio'},
		{ value: 'thanks', label: 'Gracias'},
	],
	currentScreen: 'index',
})

const mapDispatchToProps = (dispatch, props) => ({
	handleChange: (property, value) => dispatch(modifyWholeSheet(property, value)),
	handleSave: () => dispatch(saveStyles()),
	handleScreenChange: e => console.log('screen changed!', e.label),
	handlePlatformChange: platform => dispatch(setPlatform(platform)),
	resetToDefaults: () => console.log('reset to defaults!'),
})

export default connect(mapStateToProps, mapDispatchToProps)(Design)