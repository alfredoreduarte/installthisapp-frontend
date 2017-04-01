import React, { PropTypes } from 'react'

// Screens
import IntroView from 'canvas/memory_match/components/Intro'
import IndexView from 'canvas/memory_match/components/Index'
import ThanksView from 'canvas/memory_match/components/Thanks'
import AlreadyPlayedView from 'canvas/memory_match/components/AlreadyPlayed'

/** Photo samples. */
const cards = [
	{
		id: 1,
		attachmentUrl: 'https://graph.facebook.com/10208910337057839/picture?width=100&height=100',
	},
	{
		id: 2,
		attachmentUrl: 'https://graph.facebook.com/10208910337057839/picture?width=100&height=100',
	},
	{
		id: 3,
		attachmentUrl: 'https://graph.facebook.com/10208910337057839/picture?width=100&height=100',
	},
]

const Previews = ({ screen, messages, images }) => {
	switch (screen) {
		case 'intro':
			return <IntroView
				image={images.intro}
				linkUrl={'#'}
			 />
		case 'index':
			return <IndexView
				headerImage={images.header}
				footerImage={images.footer}
				cardBack={images.cardBack}
				cards={cards}
				currentTime={20}
				matchedIds={[]}
				clickCount={12}
				flippedCards={[]}
				finished={false}
				onCardFlip={() => console.log(' ')}
			 />
		case 'thanks':
			return <ThanksView
				headerImage={images.header}
				footerImage={images.footer}
				thanksMessage={messages.thanksMessage}
				userName={'Alfredo Re'}
				userIdentifier={10208910337057839}
				clicks={12}
				time={20}
			 />
		case 'already-played':
			return <AlreadyPlayedView
				headerImage={images.header}
				footerImage={images.footer}
				alreadyPlayedMessage={messages.alreadyPlayedMessage}
			 />
		default: 
			return <div>empty</div>
	}
}

Previews.screens = [
	{ value: 'intro', label: 'Introduction'},
	{ value: 'index', label: 'Game'},
	{ value: 'thanks', label: 'Thanks message'},
	{ value: 'already-played', label: 'Already played'},
]

Previews.propTypes = {
	screen: PropTypes.string.isRequired,
}

export default Previews