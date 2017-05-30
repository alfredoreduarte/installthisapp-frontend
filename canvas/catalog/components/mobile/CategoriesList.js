import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { browserHistory } from 'react-router'

const CategoriesList = ({ 
	showBack,
	categories,
}) => 
	<div style={{
		display: 'flex',
		flexWrap: 'nowrap',
		marginBottom: '.5em',
	}}>
		{showBack ? 
		<div className="ita-cali-mobile-categories-list" style={{
			flex: '0 0 auto',
			padding: '13px 16px 12px',
		}}>
			<MdArrowBack size={20} color={'#5A6471'} onClick={browserHistory.goBack} />
		</div>
		: null }
		<div style={{
			display: 'flex',
			flexWrap: 'nowrap',
			overflow: 'auto',
			WebkitOverflowScrolling: 'touch',
			msOverflowStyle: '-ms-autohiding-scrollbar',
		}}>
			{categories.map(({ slug, permalink, name }) => 
				<Link 
					key={slug} 
					to={permalink} 
					className="ita-cali-mobile-categories-list-link" 
					style={{
					flex: '0 0 auto',
					padding: '13px 16px 12px',
				}}>
					{name}
				</Link>
			)}
		</div>
	</div>

CategoriesList.propTypes = {
	categories: PropTypes.array.isRequired,
	showBack: PropTypes.bool.isRequired,
}

export default CategoriesList