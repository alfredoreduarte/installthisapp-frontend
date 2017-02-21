import React from 'react'
import Option from 'canvas/trivia/components/Option'

const OptionList = ({ options, handleClick }) => (
	<div className="col-xs-12 col-sm-12 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2">
		<ul className="list-group">
			{options.map(o => {
				return (
					<Option 
						key={o.id} 
						id={o.id} 
						text={o.text} 
						correct={o.correct} 
						handleClick={() => handleClick(o.id, o.correct)} />
				)
			})}
		</ul>
	</div>
)

export default OptionList