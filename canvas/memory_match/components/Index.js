import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Image from 'canvas/memory_match/components/Image'
import Card from 'canvas/memory_match/components/Card'

const IndexView = ({ 
	headerImage,
	footerImage,
	cardBack,
	cards
}) => (
	<div>
		{headerImage ? <Image source={headerImage} /> : null}
		<h1>00:00:00</h1>
		<div className="container">
			<div className="col-xs-12 col-sm-12 col-md-10 col-md-offset-1" style={{
				display: 'flex',
				justifyContent: 'space-around',
				flexWrap: 'wrap',
			}}>
				{cards.map( card => <Card key={card.id} cardBack={cardBack} attachmentUrl={card.attachmentUrl} />)}
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
}

export default IndexView