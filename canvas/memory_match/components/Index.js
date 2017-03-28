import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Image from 'canvas/memory_match/components/Image'
import Card from 'canvas/memory_match/components/Card'

const IndexView = ({ 
	headerImage,
	footerImage,
	cardBack,
	cards,
	onCardFlip,
	clickCount,
	currentTime,
	flippedCard,
	matchedIds,
	finished,
}) => (
	<div>
		{headerImage ? <Image source={headerImage} /> : null}
		<div className="container">
			{finished ? <h1>Finished!</h1> : null}
			<div className="col-md-6">
				<h1>Clicks</h1>
				<h3>{clickCount}</h3>
			</div>
			<div className="col-md-6 text-right">
				<h1>Time</h1>
				<h3>{currentTime}</h3>
			</div>
		</div>
		<div className="container">
			<div className="col-xs-12 col-sm-12 col-md-10 col-md-offset-1" style={{
				display: 'flex',
				justifyContent: 'space-around',
				flexWrap: 'wrap',
			}}>
				{cards.map( card => <Card 
					key={card.fakeUniqueId} 
					flipped={flippedCard == card.fakeUniqueId} 
					onFlip={() => onCardFlip(card.fakeUniqueId, card.id)} 
					cardBack={cardBack} 
					attachmentUrl={card.attachmentUrl}
					hidden={matchedIds.indexOf(card.id) >= 0}
					/>
				)}
			</div>
		</div>
		{footerImage ? <Image source={footerImage} /> : null}
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
	flippedCard: PropTypes.oneOfType([
		React.PropTypes.bool,
		React.PropTypes.string,
		React.PropTypes.number,
	]),
}

export default IndexView