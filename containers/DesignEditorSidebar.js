import React, { PropTypes } from 'react'
import FontFamily from 'components/design-tools/FontFamily'
import DesignEditorTools from 'containers/DesignEditorTools'
import DesignEditorSidebarHeader from 'containers/DesignEditorSidebarHeader'
import DesignEditorSidebarTabs from 'containers/DesignEditorSidebarTabs'

const DesignEditorSidebar = () => (
	<div className="ita-side-bar">
		
		<DesignEditorSidebarHeader
			handleClose={() => console.log('closing editor!')}
			handleSave={() => console.log('saving design!')}
			busy={true}
		/>	

		<DesignEditorSidebarTabs
			handleTabs={tab => console.log('changed tab!', tab)}
		/>

		<DesignEditorTools />
		
	</div>
)

export default DesignEditorSidebar