import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { getCurrentUsersByText } from '../selectors/users'
import { selectUser } from '../actions/actionCreators'
import { Table, DropdownButton, MenuItem } from 'react-bootstrap'
import { Checkbox } from 'react-icheck'
import SearchForm from '../components/SearchForm'
import User from '../components/User'

const Users = ({ users, handleUserSelect, selectedUserIds }) => (
	<div className="ita-table-view">
		<div className="ita-table-toolbar">
			<div className="row">
				<div className="col-md-12">
					<h3 className="ita-page-title">Users <small className=""> / {selectedUserIds.length} user{selectedUserIds.length > 1 ? 's' : ''} selected</small></h3>
				</div>
			</div>
			<div className="row">
				<div className="col-md-4">
					<SearchForm />
				</div>
				<div className="col-md-8 text-right">
					<ul className="ita-table-tools-selected list-inline list-no-margin">
						<li key={'tool-download'}>
							<a 
								href="javascript:void(0)" 
								className='pe pe-7s-download icon-tool-big btn btn-squared glyphicon glyphicon-cloud-download'>
								
							</a>
						</li>
					</ul>
				</div>
				<div className="col-md-8 text-right">
					<div className="ita-table-view-second-row">
						<div className="dropdown ita-dropdown-link hide">
							<a className="dropdown-toggle" href="javascript:void(0)" data-toggle="dropdown">cosa <span className="caret"></span></a>
							<ul className="dropdown-menu dropdown-menu-right">
								<li><a href="javascript:void(0);">cosa</a></li>
							</ul>
						</div>
						<DropdownButton bsStyle="link" title="Most Recent" pullRight>
							<MenuItem eventKey="1">Alphanumeric</MenuItem>
						</DropdownButton>
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
						<Checkbox checkboxClass="icheckbox-ita icon-tool-big pull-right" />
					</th>
				</tr>
			</thead>
			<tbody>
				{users.map(user => 
				<tr>
					<td>
						<User name={user.name} id={user.id} small />
					</td>
					<td>
						datetime
					</td>
					<td className="text-right">
						<ul className="list-inline list-no-margin">
							<li className="tool-edit">
								<a 
									href="javascript:void(0)" 
									className="ion ion-ios-compose-outline icon-tool-big link-no-color visible-on-hover">
								</a>
							</li>
							<li>
								<a 
									href="javascript:void(0)" 
									className="ion ion-ios-trash-outline icon-tool-big link-no-color visible-on-hover">
								</a>
							</li>
							<li>
								<Checkbox 
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
		users: _.values(getCurrentUsersByText(state, props)),
		selectedUserIds: state.selectedUserIds
	}
};

const mapDispatchToProps = (dispatch, props) => {
	return { 
		handleUserSelect: id => {
			console.log('user selected', id)
			dispatch(selectUser(id))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Users)