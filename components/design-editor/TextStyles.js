import React, { PropTypes } from 'react'
import { ButtonToolbar, ButtonGroup, Button, Glyphicon } from 'react-bootstrap'

const TextStyles = ({ iconNames, options, value, onChange }) => (
	<ButtonToolbar>
		<ButtonGroup className="ita-btn-group-editor">
			{value.map(v => (
				<Button
					key={v.property}
					active={v.value == options[v.property]}
					onClick={() => onChange(v.property, v.value == options[v.property] ? 'inherit' : options[v.property])}>
					<Glyphicon glyph={iconNames[v.property]} />
				</Button>
			))}
		</ButtonGroup>
	</ButtonToolbar>
)

TextStyles.propTypes = {
	options: PropTypes.object,
	iconNames: PropTypes.object,
	value: PropTypes.array.isRequired,
	onChange: PropTypes.func.isRequired,
}

TextStyles.defaultProps = {
	options: {
		'font-weight': 'bold',
		'font-style': 'italic',
		'text-decoration': 'underline',
		'text-transform': 'uppercase',
	},
	iconNames: {
		'font-weight': 'bold',
		'font-style': 'italic',
		'text-decoration': 'text-color',
		'text-transform': 'text-size',
	},
}

export default TextStyles
