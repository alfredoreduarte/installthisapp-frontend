import React, { PropTypes } from 'react'

// Screens
import Index from 'canvas/trivia/components/Index'
import Message from 'canvas/trivia/components/Message'

const Previews = ({ screen }) => {
	switch (screen) {
		case 'index':
			return (
				<Index
					question={{
						id: 1,
						text: 'hola',
						options: [
							{
								id: 1,
								text: 'Fusce Vulputate Sollicitudin Parturient Mattis',
							},
							{
								id: 2,
								text: 'Cursus Purus Justo Sollicitudin Fermentum',
							},
							{
								id: 3,
								text: 'Malesuada Amet Consectetur Justo Porta',
							}
						]
					}}
					time={255}
					handleClick={() => {}}
				 />
			)
			break
		case 'alreadyPlayed':
			return <Message title={`You've already played`} foot={`pie`} />
			break
		case 'thanks':
			return <Message title={`Thanks for playing`} foot={`foot`} />
			break
		default: 
			return <div>empty</div>
	}
}

Previews.screens = [
	{ value: 'index', label: 'Questions'},
	{ value: 'thanks', label: 'Game finished'},
	{ value: 'alreadyPlayed', label: 'Already Played'},
]

Previews.propTypes = {
	screen: PropTypes.string.isRequired,
}

export default Previews