import React from 'react'
import { connect } from 'react-redux'
import Summary from 'modules/catalog/components/Summary'
import { getMostRequestedProducts, getFilteredProducts } from 'modules/catalog/selectors/products'

const Dashboard = ({ checksum, type, entries, hasProducts }) => (
	<Summary checksum={checksum} type={type} entries={entries} hasProducts={hasProducts} />
)

const mapStateToProps = (state, props) => {
	return {
		checksum: props.params.checksum,
		type: props.params.type,
		entries: getMostRequestedProducts(state, props),
		hasProducts: getFilteredProducts(state, props).length > 0,
	}
}

export default connect(mapStateToProps)(Dashboard)