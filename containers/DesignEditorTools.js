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
								values={[
									{ value: 'Times New Roman', label: 'Times New Roman' },
									{ value: 'Arial', label: 'Arial' },
									{ value: 'Verdana', label: 'Verdana' },
									{ value: 'Helvetica', label: 'Helvetica' },
									{ value: 'Georgia', label: 'Georgia' },
									{ value: 'Open Sans', label: 'Open Sans' },
									{ value: 'Oswald', label: 'Oswald' },
									{ value: 'Proxima Nova', label: 'Proxima Nova' },
								]}
								handleChange={newValue => handleChange(selector, property, newValue)}
								defaultValue={value}
							/>
						)
					case 'text-decoration':
						return (
							<input 
								type="text" 
								className="form-control" 
								defaultValue={value} 
								onChange={e => handleChange(selector, property, e.target.value)} />
						)
					case 'font-size':
						return (
							<input 
								type="text" 
								className="form-control" 
								defaultValue={value} 
								onChange={e => handleChange(selector, property, e.target.value)} />
						)
					default:
						return null
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