import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { Navbar, NavDropdown, DropdownButton, MenuItem } from 'react-bootstrap'
import { Link, IndexLink } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { sortAppsBy } from 'actions/appsSorting'
import SearchForm from 'components/SearchForm'

const DashboardToolBar = ({ sortBy, handleSort }) => (
	<div className="col-md-12 ita-dashboard-tools hide">
		<div className="row">
			<div className="col-md-4">
				<SearchForm />
			</div>
			<div className="col-md-3 col-md-offset-5">
				<Select
					searchable={false}
					autosize={false}
					clearable={false}
					name="form-field-name"
					value={sortBy}
					options={[
						{ value: 'title', label: 'Alphabetically' },
						{ value: 'updatedOn', label: 'Most Recent' }
					]}
					onChange={val => handleSort(val.value)}
				/>
			</div>
		</div>
	</div>
)

const mapStateToProps = (state, props) => {
	return {
		sortBy: state.appsSorting
	}
};

const mapDispatchToProps = (dispatch, props) => ({
	handleSort: sorter => dispatch(sortAppsBy(sorter))
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardToolBar)