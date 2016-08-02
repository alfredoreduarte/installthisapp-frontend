import React from 'react'
import Option from './Option'

const OptionList = ({ options }) => (
	<div className="list-group">
		{options.map(o => {
			return <Option key={o.id} id={o.id} text={o.text} handleClick={id => console.log('clicked option', id)} />
		})}
	</div>
)

export default OptionList