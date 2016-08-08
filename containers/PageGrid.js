import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { push } from 'react-router-redux'
import { setNewAppPage } from 'actions/newApp'
import { fetchFacebookPages } from 'actions/pages'
import { getAllPages } from 'selectors/pages'
import { fbLogin } from 'lib/facebook'

const PageGrid = ({ pages, handlePageSelection, handlePermissionRequest }) => (
	<div className="container-fluid">
		{pages.length > 0 
		? pages.map( page => {
			return (
				<div className="col-md-3" key={page.id}>
					<button 
						className="btn btn-default"
						onClick={() => handlePageSelection(page.identifier)} 
						style={{height: '50px', background: '#f3f3f3'}}>{page.name}</button>
				</div>
			)
		})
		:
		<div className="text-center">
			<p>No pages</p>
			<button className="btn btn-primary" onClick={() => handlePermissionRequest()}>Get facebook pages</button>
		</div>
		}
	</div>
)

const mapStateToProps = (state, props) => {
	return {
		pages: getAllPages(state)
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	handlePageSelection: id => {
		dispatch(setNewAppPage(id))
		dispatch(push('/d/apps/create/3'))
	},
	handlePermissionRequest: () => {
		fbLogin(response => {
			console.log(response)
			dispatch(fetchFacebookPages())
		})
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(PageGrid)