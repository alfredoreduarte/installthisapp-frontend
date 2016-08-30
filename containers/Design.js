import React from 'react'
import { connect } from 'react-redux'
import { getRulesetForActiveSelector as getRuleset } from 'selectors/styles'
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
	ruleset, 
	selector, 
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
			<Tools ruleset={ruleset} handleChange={handleChange} selector={selector} />
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
	ruleset: getRuleset(state),
	selector: state.styles.activeSelector,
	screens: [
		{ value: 'index', label: 'Inicio'},
		{ value: 'thanks', label: 'Gracias'},
	],
	currentScreen: 'index',
})

const mapDispatchToProps = (dispatch, props) => ({
	handleChange: (selector, property, value) => dispatch(modifyWholeSheet(selector, property, value)),
	handleSave: () => dispatch(saveStyles()),
	handleScreenChange: e => console.log('screen changed!', e.label),
	handlePlatformChange: platform => dispatch(setPlatform(platform)),
	resetToDefaults: () => console.log('reset to defaults!'),
})

export default connect(mapStateToProps, mapDispatchToProps)(Design)