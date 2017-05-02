import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Image from 'canvas/memory_match/components/Image'
import Card from 'canvas/memory_match/components/Card'
import Credits from 'canvas/memory_match/components/Credits'

const IndexView = ({ 
	headerImage,
	footerImage,
	cardBack,
	cards,
	onCardFlip,
	clickCount,
	currentTime,
	flippedCards,
	matchedIds,
	finished,
}) => (
	<div>
		{headerImage ? <Image source={headerImage} /> : null}
		<div className="Indicators">
			<div className="Indicator-left animated slideInLeft">
				<div className="Indicator-background"></div>
				<span className="ita-cali-indicator-text">{clickCount}</span>
			</div>
			<div className="Indicator-right animated slideInRight">
				<div className="Indicator-background"></div>
				<span className="ita-cali-indicator-text">{currentTime}</span>
			</div>
		</div>
		<div className="container hide">
			{finished ? <h1>Finished!</h1> : null}
		</div>
		<div className="container">
			<div className="" style={{
				display: 'flex',
				justifyContent: 'space-around',
				flexWrap: 'wrap',
				marginBottom: '30px',
			}}>
				{cards.map( card => <Card 
					key={card.fakeUniqueId} 
					flipped={flippedCards.indexOf(card.fakeUniqueId) >= 0} 
					onFlip={() => onCardFlip(card.fakeUniqueId, card.id)} 
					cardBack={cardBack} 
					attachmentUrl={card.attachmentUrl}
					hidden={matchedIds.indexOf(card.id) >= 0}
					/>
				)}
			</div>
		</div>
		{footerImage ? <Image source={footerImage} /> : null}
		<Credits />
	</div>
)

IndexView.propTypes = {
	headerImage: PropTypes.string,
	footerImage: PropTypes.string,
	cardBack: PropTypes.string,
	cards: PropTypes.array.isRequired,
	matchedIds: PropTypes.array.isRequired,
	onCardFlip: PropTypes.func.isRequired,
	clickCount: PropTypes.number.isRequired,
	currentTime: PropTypes.number.isRequired,
	flippedCards: PropTypes.oneOfType([
		React.PropTypes.array,
	]),
}

export default IndexView