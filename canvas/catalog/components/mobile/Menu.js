import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { DropdownButton, MenuItem } from 'react-bootstrap'
import _ from 'lodash'

const Menu = ({ 
	options
}) => (
	<DropdownButton style={styles.container}>
		{options.map(option =>
			<MenuItem value={option.key}>
				{option.value}
			</MenuItem>
		)}
	</DropdownButton>
)

const layout = {
	container: {
		
	},
	logo: {
		height: '20px',
	}
}

const variableStyles = {
	container: {
		
	},
	logo: {
		
	}
}

const styles = _.merge(layout, variableStyles)

Menu.propTypes = {
	options: PropTypes.array.isRequired,
}

export default Menu