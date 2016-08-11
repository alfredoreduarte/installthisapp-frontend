import React from 'react'
import Option from 'canvas/trivia/components/Option'

const OptionList = ({ options, handleClick }) => (
	<div className="list-group">
		{options.map(o => {
			return <Option key={o.id} id={o.id} text={o.text} correct={o.correct} handleClick={() => handleClick(o.id, o.correct)} />
		})}
	</div>
)

export default OptionList