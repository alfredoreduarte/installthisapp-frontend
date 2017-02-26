import React, { PropTypes } from 'react'

// Screens
import Index from 'canvas/trivia/components/Index'
import Intro from 'canvas/trivia/components/Intro'
import AlreadyPlayed from 'canvas/trivia/components/AlreadyPlayed'
import Thanks from 'canvas/trivia/components/Thanks'

/** Sample data. */
const question = {
	id: 1,
	text: 'Question text',
	options: [
		{
			id: 1,
			text: 'Answer text Vulputate Sollicitudin Parturient Mattis',
		},
		{
			id: 2,
			text: 'Answer text Cursus Purus Justo Sollicitudin Fermentum',
		},
		{
			id: 3,
			text: 'Answer text Malesuada Amet Consectetur Justo Porta',
		}
	]
}

const Previews = ({ screen, messages, images }) => {
	switch (screen) {
		case 'intro':
			return <Intro
				intro={images.intro}
			 />
		case 'index':
			return (
				<Index
					header={images.header}
					footer={images.footer}
					question={question}
					time={255}
					handleAnswer={() => {}}
				 />
			)
			break
		case 'alreadyPlayed':
			return <AlreadyPlayed 
				header={images.header}
				footer={images.footer}
				title={messages.alreadyPlayed} 
				foot={` `} />
			break
		case 'thanks':
			return <Thanks 
				header={images.header}
				footer={images.footer}
				title={messages.thankYou} 
				foot={`foot`} />
			break
		default: 
			return <div>empty</div>
	}
}

Previews.screens = [
	{ value: 'intro', label: 'Intro'},
	{ value: 'index', label: 'Questions'},
	{ value: 'thanks', label: 'Game finished'},
	{ value: 'alreadyPlayed', label: 'Already Played'},
]

Previews.propTypes = {
	screen: PropTypes.string.isRequired,
}

export default Previews