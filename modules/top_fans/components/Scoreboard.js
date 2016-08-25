import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import Select from 'react-select'
import { Table, DropdownButton, MenuItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Checkbox } from 'react-icheck'
import { fetchTopFansEntities } from 'modules/top_fans/actions/entities'
import { getCurrentUsersByKeyword } from 'selectors/users'
import { getLikesForPage } from 'modules/top_fans/selectors/likes'
import { selectItemOnTable, sortUsersBy } from 'actions/users'
import SearchForm from 'components/SearchForm'
import User from 'components/User'
// import topFansTest from 'lib/topFansTest'

const Scoreboard = ({
	likes,
	users, 
	fetch,
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
						Scoreboard 
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
					<button className="btn btn-default" onClick={fetch}>
						Refresh
					</button>
					<button onClick={() => console.log('test disabled')} className="btn btn-default">
						Post demo fans data to API
					</button>
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
								{ value: 'createdOn', label: 'Most Recent' }
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
						<span>Likes</span>
					</th>
					<th>
						<span>Comments</span>
					</th>
					<th>
						<span>Score</span>
					</th>
				</tr>
			</thead>
			<tbody>
				{likes.map(like => 
				<tr key={like.id.userIdentifier}>
					<td>
						<User name={like.id.userName} identifier={like.id.userIdentifier} small />
					</td>
					<td>
						{like.likes}
					</td>
					<td>
						coming soon
					</td>
					<td>
						<b>score pts.</b>
					</td>
				</tr>
				)}
			</tbody>
		</Table>
	</div>
)

const mapStateToProps = (state, props) => {
	return { 
		likes: getLikesForPage(state, props),
		users: getCurrentUsersByKeyword(state, props),
		selectedItems: state.selectedItems,
		sortBy: state.usersSorting
	}
}

const mapDispatchToProps = (dispatch, props) => {
	dispatch(fetchTopFansEntities(props.params.checksum))
	return {
		handleUserSelect: id => {
			dispatch(selectItemOnTable(id))
		},
		handleUserSelectBatch: users => {
			users.map(user => dispatch(selectItemOnTable(user.id)))
		},
		handleSort: sorter => dispatch(sortUsersBy(sorter)),
		fetch: () => dispatch(fetchTopFansEntities(props.params.checksum))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Scoreboard)