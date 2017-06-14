import React, { Component, PropTypes } from 'react'
import confirm from 'react-confirm2'
import Select from 'react-select'
import Modal from 'react-modal'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'
// import DatePicker from 'react-datepicker'
import { ButtonToolbar, Table, DropdownButton, MenuItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Checkbox } from 'react-icheck'
import { fetchTopFansEntities, fetchTopFansSettings, cleanupTopFansEntities, resetTopFansEntities } from 'modules/top_fans/actions/entities'
import { getCurrentUsersByKeyword } from 'selectors/users'
import { getAllPages } from 'selectors/pages'
import { getCurrentAppByState } from 'selectors/apps'
import { getEntriesForPage } from 'modules/top_fans/selectors/entries'
import { pollTopFansEntities } from 'modules/top_fans/actions/entities'
import { selectItemOnTable, sortUsersBy } from 'actions/users'
import { updateAppSettings } from 'actions/apps'
import { editAppSpecificSettings } from 'modules/top_fans/actions'
import SearchForm from 'components/SearchForm'
import User from 'components/User'

const Scoreboard = ({
	toggleResetModal,
	showResetModal,
	firstFetchFromDate,
	onDateChange,
	// 
	likeMultiplier,
	commentMultiplier,
	tabIntegrated,
	entries,
	users, 
	fetch,
	cleanup,
	reset,
	selectedItems,
	sortBy,
	handleUserSelect, 
	handleUserSelectBatch,
	handleSort
}) => (
	<div className="ita-table-view">
		<Modal
			isOpen={showResetModal}
			onAfterOpen={() => console.log('afteropen')}
			onRequestClose={toggleResetModal}
			contentLabel="Modal"
		>
			<a href="javascript:void(0)" onClick={toggleResetModal}><small>← back</small></a>
			<h1>Reset Scoreboard</h1>
			<p>Track past activities starting at:</p>
			<div className="col-md-6">
				<SingleDatePicker 
					id="lafecha"
					// placeholderText="Select a date"
					date={firstFetchFromDate}
					isOutsideRange={day => day.isAfter(moment().subtract(1, 'days')) || day.isBefore(moment().subtract(240, 'days'))}
					// maxDate={moment()}
					// disabled={!trackFromDate}
					// minDate={moment().subtract(120, "days")}
					numberOfMonths={1}
					// autoFocus={false}
					focused={true}
					onDateChange={onDateChange}
					// onFocusChange={onToggleDatePicker}
				/>
				<button style={{marginLeft: '20px'}} onClick={reset} className="btn btn-primary" disabled={firstFetchFromDate ? false : true}>Reset Scoreboard</button>
			</div>
			<div className="col-md-6">
			</div>
		</Modal>
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
					<div className="hide"><SearchForm /></div>
				</div>
				<div className="col-md-8 text-right">
					{entries.length == 0 ?
						null
					:
					<ButtonToolbar>
						<button className="btn btn-sm btn-danger pull-right" onClick={toggleResetModal}>
							Reset
						</button>
						<button className="btn btn-sm btn-danger pull-right hide" onClick={cleanup}>
							Reset starting now
						</button>
						<button className="btn btn-sm btn-default pull-right" onClick={fetch}>
							Refresh
						</button>
					</ButtonToolbar>
					}
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
					<div className="ita-table-view-second-row hide">
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
		{entries.length == 0 ?
			<div className="ita-empty text-center">
				<h3>
					There are no likes or comments yet.
				</h3>
				<h4><b>Important:</b></h4>
				<div className="row">
					<div className="col-md-6 col-md-offset-3">
						<ul className="text-left">
							<li>Make sure you've installed the integration following the Setup Guide</li>
							<li>If you've just reset the scoreboard, wait a moment to let it process the first scores and then hit "Check Again"</li>
							<li>If you still don't see any interaction, go to your Facebook Page, like or comment on the most recent post, and then hit "Check Again". You can un-like or remove your comment after checking that is shows up here.</li>
						</ul>
					</div>
				</div>
				<br />
				<br />
				<img 
					src="/images/dashboard-empty.png"
					style={{height: '100px'}}
					className="ita-empty-illustration animated fadeInUp" />
				<br />
				<br />
				<p>
					<button
						onClick={fetch}
						className="btn btn-success animated fadeInUp">
						Check again
					</button>
				</p>
				{tabIntegrated ? <p><a href="javascript:void(0)" onClick={toggleResetModal}><small>Reset scores</small></a></p> : null}
			</div>
		:
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
							<b>{entry.score}</b>
						</td>
					</tr>
					)}
				</tbody>
			</Table>
		}
	</div>
)

const handleScore = score => score ? score : 0

const mapStateToProps = (state, props) => {
	const currentApp = getCurrentAppByState(state)
	const tabInstalledInPage = getCurrentAppByState(state).page ? _.find(getAllPages(state), {'id': getCurrentAppByState(state).page}).name : null
	// handleScore(entry.likes) * likeMultiplier + handleScore(entry.comments) * commentMultiplier
	return { 
		showResetModal: state.topFans.ui.showResetModal,
		firstFetchFromDate: currentApp.setting.firstFetchFromDate,
		firstFetchFromDate: currentApp.setting.firstFetchFromDate ? moment(currentApp.setting.firstFetchFromDate) : null,
		// 
		// likeMultiplier: currentApp.setting.pointsPerLike,
		// commentMultiplier: currentApp.setting.pointsPerComment,
		tabIntegrated: tabInstalledInPage,
		entries: getEntriesForPage(state),
		users: getCurrentUsersByKeyword(state, props),
		selectedItems: state.selectedItems,
		sortBy: state.usersSorting
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		toggleResetModal: () => dispatch({
			type: 'TOP_FANS/TOGGLE_RESET_MODAL',
		}),
		onDateChange: date => {
			dispatch(editAppSpecificSettings(date.format()))
		},
		// 
		handleUserSelect: id => {
			dispatch(selectItemOnTable(id))
		},
		handleUserSelectBatch: users => {
			users.map(user => dispatch(selectItemOnTable(user.id)))
		},
		handleSort: sorter => dispatch(sortUsersBy(sorter)),
		fetch: () => dispatch(fetchTopFansEntities(props.params.checksum)),
		cleanup: () => {
			confirm('Sure? This will delete ALL current scores', {
				done: () => dispatch(cleanupTopFansEntities()),
				confirmLabel: 'Delete all scores',
				abortLabel: 'Cancel',
				// unmount: () => console.log('unmounted'),
				// close: () => console.log('close!'),
			})
		},
		reset: () => {
			dispatch(updateAppSettings()).then(() => {
				dispatch(resetTopFansEntities()).then(() => {
					dispatch({
						type: 'TOP_FANS/TOGGLE_RESET_MODAL',
					})
					dispatch(pollTopFansEntities(props.params.checksum))
				})
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Scoreboard)