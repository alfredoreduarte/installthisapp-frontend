import React, { PropTypes } from 'react'
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
							onChange={newValue => {
								const sanitizedValue = `"${newValue}"`
								handleChange(property, sanitizedValue)
							}}
							value={value.slice(1, -1)}
						/>
					)
					break
			}
		})}
	</div>
)

export default DesignEditorTools