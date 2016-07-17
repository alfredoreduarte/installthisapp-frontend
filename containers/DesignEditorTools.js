import React, { Component, PropTypes } from 'react'
import FontFamily from 'components/design-editor/FontFamily'

class DesignEditorTools extends Component {
	render(){
		const { ruleset, selector, handleChange } = this.props
		const tools = ruleset.map(rule => {
			return rule.declarations.map(declaration => {
				const { property, value } = declaration
				switch (property){
					case 'font-family':
						return (
							<FontFamily
								handleChange={newValue => handleChange(selector, property, newValue)}
								defaultValue={value}
							/>
						)
					default:
						return (
							<div>
								<label>{property}</label>
								<input 
									type="text" 
									className="form-control" 
									defaultValue={value} 
									onChange={e => handleChange(selector, property, e.target.value)} />
							</div>
						)
				}
			})
		})
		return (
			<div className="ita-side-bar-content ita-scrollable-area ita-side-bar-tools">
				{tools}
			</div>
		)
	}
}

export default DesignEditorTools