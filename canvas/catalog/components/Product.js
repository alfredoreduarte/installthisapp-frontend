import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Image from 'canvas/catalog/components/Image'

const Product = ({ 
	thumbnail,
	permalink,
	title,
	subtitle,
	price,
	displayMode,
}) => (
	<div className={displayMode == 'grid' ? "col-xs-12 col-sm-6 col-md-3" : "col-xs-12 col-sm-12 col-md-12"}>
		{displayMode == 'grid' ? 
			<Link to={permalink} className="thumbnail">
				<img src={thumbnail} alt={title} />
				<div className="caption">
					<h3>{title}</h3>
					<p>{subtitle}</p>
					<p>{price}</p>
				</div>
			</Link>
		:
			<div className="media">
				<div className="media-left media-middle">
					<Link to={permalink}>
						<img className="media-object" src={thumbnail} alt={title} style={{height: '50px'}} />
					</Link>
				</div>
				<div className="media-body media-middle">
					<Link to={permalink}><h4 className="media-heading">{title}</h4></Link>
					<p>{subtitle}</p>
					<p>{price}</p>
				</div>
			</div>
		}
	</div>
)

Product.propTypes = {
	permalink: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string,
	price: PropTypes.string,
}


export default Product