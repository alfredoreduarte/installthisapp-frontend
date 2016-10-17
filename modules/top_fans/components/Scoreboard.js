import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import Select from 'react-select'
import { Table, DropdownButton, MenuItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Checkbox } from 'react-icheck'
import { fetchTopFansEntities, fetchTopFansSettings } from 'modules/top_fans/actions/entities'
import { getCurrentUsersByKeyword } from 'selectors/users'
import { getCurrentAppByState } from 'selectors/apps'
import { getEntriesForPage } from 'modules/top_fans/selectors/entries'
import { selectItemOnTable, sortUsersBy } from 'actions/users'
import SearchForm from 'components/SearchForm'
import User from 'components/User'

const handleScore = score => score ? score : 0

const Scoreboard = ({
	likeMultiplier,
	commentMultiplier,
	entries,
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
				{entries.map(entry => 
				<tr key={entry.senderId}>
					<td>
						<User 
							name={entry.senderName} 
							identifier={entry.senderId} 
							small
							 />
					</td>
					<td>
						{entry.likes}
					</td>
					<td>
						{entry.comments}
					</td>
					<td>
						<b>{handleScore(entry.likes) * likeMultiplier + handleScore(entry.comments) * commentMultiplier}</b>
					</td>
				</tr>
				)}
			</tbody>
		</Table>
	</div>
)

const mapStateToProps = (state, props) => {
	const currentApp = getCurrentAppByState(state)
	return { 
		likeMultiplier: currentApp.setting.pointsPerLike,
		commentMultiplier: currentApp.setting.pointsPerComment,
		entries: getEntriesForPage(state, props),
		users: getCurrentUsersByKeyword(state, props),
		selectedItems: state.selectedItems,
		sortBy: state.usersSorting
	}
}

const mapDispatchToProps = (dispatch, props) => {
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