import React, { PropTypes } from 'react'

// Screens
import Index from 'canvas/trivia/components/Index'
import AlreadyPlayed from 'canvas/trivia/components/AlreadyPlayed'
import Thanks from 'canvas/trivia/components/Thanks'

const Previews = ({ screen, messages }) => {
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
					handleAnswer={() => {}}
				 />
			)
			break
		case 'alreadyPlayed':
			return <AlreadyPlayed 
				title={messages.alreadyPlayed} 
				foot={` `} />
			break
		case 'thanks':
			return <Thanks 
				title={messages.thankYou} 
				foot={`foot`} />
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