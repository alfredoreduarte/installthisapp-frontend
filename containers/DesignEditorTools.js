import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import FontFamily from 'components/design-editor/FontFamily'

const DesignEditorTools = ({ declarations, handleChange }) => (
	<div className="ita-side-bar-content ita-scrollable-area ita-side-bar-tools">
		{declarations.map( declaration => {
			const { property, value } = declaration
			switch (property) {
				case 'font-family':
					return (
						<FontFamily
							key={property}
							onChange={newValue => handleChange(property, newValue)}
							value={value}
						/>
					)
					break
				default:
					return (
						<div key={property}>
							<label>{property}</label>
							<input 
								type="text" 
								className="form-control" 
								value={value} 
								onChange={e => handleChange(property, e.target.value)} />
						</div>
					)
			}
		})}
	</div>
)

const mapStateToProps = (state, props) => ({
	
})

const mapDispatchToProps = (dispatch, props) => ({
	
})

export default connect(mapStateToProps, mapDispatchToProps)(DesignEditorTools)