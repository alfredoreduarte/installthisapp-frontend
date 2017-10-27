import React, { PropTypes } from 'react'
import { ButtonToolbar, ButtonGroup, Button, Glyphicon } from 'react-bootstrap'

const BackgroundRepeat = ({ iconNames, options, value, onChange }) => (
	<ButtonToolbar>
		<ButtonGroup className="ita-btn-group-editor">
			{options.map((o, index) => (
				<Button key={o} active={value == o} onClick={() => onChange(o)}>
					<Glyphicon glyph={iconNames[index]} />
				</Button>
			))}
		</ButtonGroup>
	</ButtonToolbar>
)

BackgroundRepeat.propTypes = {
	options: PropTypes.array,
	iconNames: PropTypes.array,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
}

BackgroundRepeat.defaultProps = {
	options: ['no-repeat', 'repeat', 'repeat-y', 'repeat-x'],
	iconNames: ['unchecked', 'th-large', 'option-vertical', 'option-horizontal'],
}

export default BackgroundRepeat
