import React, { Component, PropTypes } from 'react'
import FontFamily from 'components/design-editor/FontFamily'

class DesignEditorTools extends Component {
	render(){
		const { selector, ruleset } = this.props
		const tools = ruleset.map(rule => {
			return rule.declarations.map(declaration => {
				if (declaration.property == 'font-family') {
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
							handleChange={value => console.log('changed font family!', value)}
							defaultValue={declaration.value}
						/>
					)
				}
			})
		})
		return (
			<div className="ita-side-bar-content ita-scrollable-area ita-side-bar-tools">
				<p> hola {selector}</p>
				{tools}
			</div>
		)
	}
}

export default DesignEditorTools