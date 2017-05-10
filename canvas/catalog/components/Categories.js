import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Image from 'canvas/catalog/components/Image'
import Header from 'canvas/catalog/components/Header'

const Categories = ({ 
	headerImage,
	footerImage,
	currency,
	products,
	categories,
	homeUrl,
}) => (
	<div>
		<div className="container">
			<Header homeUrl={homeUrl} logoImage={'https://localhost.ssl:5000/images/logo-round.png'} />
		</div>
		<div className="container">
			<div className="col-md-12">
				<div className="row">
					{categories.map( ({ id, permalink, name }) => 
						<p
							key={id} 
						>
							<Link to={permalink}>{name}</Link>
						</p>
					)}
				</div>
			</div>
		</div>
		<Image source={footerImage} />
	</div>
)

Categories.propTypes = {
	headerImage: PropTypes.string,
	footerImage: PropTypes.string,
	categories: PropTypes.array.isRequired,
	homeUrl: PropTypes.string.isRequired,
}

export default Categories