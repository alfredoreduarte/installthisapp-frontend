import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import Select from 'react-select'
import { Table, DropdownButton, MenuItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Checkbox } from 'react-icheck'
import { getCurrentUsersByKeyword } from 'selectors/users'
import { selectItemOnTable, sortUsersBy } from 'actions/users'
import SearchForm from 'components/SearchForm'
import User from 'components/User'

const Users = ({ 
	users, 
	selectedItems,
	sortBy,
	handleUserSelect, 
	handleUserSelectBatch,
	handleSort
}) => (
	<div className="ita-table-view">
		<div className="ita-table-toolbar">
			<div className="row">
				<div className="col-md-12">
					<h3 className="ita-page-title">
						Users 
						<small className={selectedItems.length ? '' : 'hide'}>
							{' '}/ {selectedItems.length} 
							{' '}user{selectedItems.length > 1 ? 's' : ''} selected
						</small>
					</h3>
				</div>
			</div>
			<div className="row">
				<div className="col-md-4">
					<SearchForm />
				</div>
				<div className="col-md-8 text-right">
					<ul className="ita-table-tools-selected list-inline list-no-margin">
						<li className={selectedItems.length ? '' : 'hide'}>
							<a 
								href="javascript:void(0)" 
								className='
									icon-tool-big 
									btn 
									btn-squared 
									glyphicon 
									glyphicon-cloud-download'></a>
						</li>
					</ul>
				</div>
				<div className="col-md-3 col-md-offset-9">
					<div className="ita-table-view-second-row">
						<Select
							searchable={false}
							autosize={false}
							clearable={false}
							name="form-field-name"
							value={sortBy}
							options={[
								{ value: 'name', label: 'Alphabetically' },
								{ value: 'createdAt', label: 'Most Recent' }
							]}
							onChange={val => handleSort(val)}
						/>
					</div>
				</div>
			</div>
		</div>
		<Table className="ita-table">
			<thead>
				<tr>
					<th>
						<span>Name</span>
					</th>
					<th>
						<span>First seen</span>
					</th>
					<th className="text-right">
						<Checkbox 
							checked={selectedItems.length == users.length}
							checkboxClass="icheckbox-ita icon-tool-big pull-right"
							onChange={() => handleUserSelectBatch(users)}
						 />
					</th>
				</tr>
			</thead>
			<tbody>
				{users.map(user => 
				<tr key={user.id}>
					<td>
						<User name={user.name} identifier={user.identifier} small />
					</td>
					<td>
						{user.createdAt}
					</td>
					<td className="text-right">
						<ul className="list-inline list-no-margin">
							<li>
								<Checkbox 
									checked={selectedItems.indexOf(user.id) !== -1 ? true : false}
									checkboxClass="icheckbox-ita icon-tool-big pull-right"
									onChange={() => handleUserSelect(user.id)}
								/>
							</li>
						</ul>
					</td>
				</tr>
				)}
			</tbody>
		</Table>
	</div>
)

const mapStateToProps = (state, props) => {
	return { 
		users: getCurrentUsersByKeyword(state, props),
		selectedItems: state.selectedItems,
		sortBy: state.usersSorting
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	handleUserSelect: id => {
		dispatch(selectItemOnTable(id))
	},
	handleUserSelectBatch: users => {
		users.map(user => dispatch(selectItemOnTable(user.id)))
	},
	handleSort: sorter => dispatch(sortUsersBy(sorter))
})

export default connect(mapStateToProps, mapDispatchToProps)(Users)