import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import FontFamily from 'components/design-editor/FontFamily'

const DesignEditorTools = ({ declarations, onChange }) => (
	<div className="ita-side-bar-content ita-scrollable-area ita-side-bar-tools">
		{declarations.map( declaration => {
			const { property, value } = declaration
			switch (property) {
				case 'font-family':
					return (
						<FontFamily
							key={property}
							onChange={newValue => onChange(property, newValue)}
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
								onChange={e => onChange(property, e.target.value)} />
						</div>
					)
			}
		})}
	</div>
)

const mapStateToProps = (state, props) => {
	const declarations = props.ruleset.map( rule => rule.declarations.map( declaration => declaration ) )
	return {
		declarations: declarations[0] || [],
	}
}

const mapDispatchToProps = (dispatch, props) => {
	const { handleChange, selector } = props
	return {
		onChange: (property, value) => handleChange(selector, property, value)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DesignEditorTools)