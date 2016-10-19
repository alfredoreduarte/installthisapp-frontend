import React from 'react'
import _ from 'lodash'
import { Glyphicon } from 'react-bootstrap'

const ToolSet = ({ children }) => 
	<div className="ita-side-bar-content ita-scrollable-area ita-side-bar-tools">
		{
			_.compact(children).length
			? 
			children
			:
			<div 
				className="text-center">
				<h1 style={{color: '#2C333E', marginBottom: '20px'}}>
					<Glyphicon glyph="pencil" />
				</h1>
				<h4>Nothing Selected</h4>
				<p className="text-muted">Select an item from the right to edit its styles.</p>
			</div>
		}
	</div>


export default ToolSet