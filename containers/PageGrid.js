import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { push } from 'react-router-redux'
import { setNewAppPage } from 'actions/newApp'

const PageGrid = ({ pages, handlePageSelection }) => (
	<div className="container-fluid">
		{pages.map( page => {
			return (
				<div className="col-md-3" key={page.id}>
					<div onClick={() => handlePageSelection(page.id)}>{page.name}</div>
				</div>
			)
		})}
	</div>
)

const mapStateToProps = (state, props) => {
	return { 
		pages: [
			{
				id: 1231232112,
				name: 'Alfred tests'
			},
			{
				id: 348923084902,
				name: 'Testecito'
			}
		]
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	handlePageSelection: id => {
		dispatch(setNewAppPage(id))
		dispatch(push('/create/3'))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(PageGrid)