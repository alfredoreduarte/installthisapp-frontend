import React, { Component, PropTypes } from 'react'
import confirm from 'react-confirm2'
import Select from 'react-select'
import Modal from 'react-modal'
import moment from 'moment'
import { Link } from 'react-router'
import { SingleDatePicker } from 'react-dates'
import FaEyeSlash from 'react-icons/lib/fa/eye-slash'
import { ButtonToolbar, Table, DropdownButton, MenuItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Checkbox } from 'react-icheck'
import { fetchTopFansEntities, fetchTopFansSettings, cleanupTopFansEntities, resetTopFansEntities } from 'modules/top_fans/actions/entities'
import { getCurrentUsersByKeyword } from 'selectors/users'
import { getAllPages } from 'selectors/pages'
import { getCurrentAppByState } from 'selectors/apps'
import { getEntriesForPage } from 'modules/top_fans/selectors/entries'
import { pollTopFansEntities } from 'modules/top_fans/actions/entities'
// import UserDetailsContainer from 'modules/top_fans/containers/UserDetailsContainer'
import { selectItemOnTable, sortUsersBy } from 'actions/users'
import { updateAppSettings } from 'actions/apps'
import { editAppSpecificSettings } from 'modules/top_fans/actions'
import SearchForm from 'components/SearchForm'
import User from 'components/User'

const Scoreboard = ({
	// CSV
	fetchDetailsDemo,
	generateCsv,
	// CSV
	checksum,
	// toggleResetModal,
	isCurrentlyPolling,
	// showResetModal,
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
	handleSort,
	addIgnoredUserIdentifier,
}) => (
	<div className="ita-table-view">
		<div className="ita-table-toolbar">
			<div className="row">
				<div className="col-md-12">
					<h3 className="ita-page-title">
						Scoreboard <br/>
						<small className={selectedItems.length ? '' : 'hide'}>
							{' '}/ {selectedItems.length} 
							{' '}user{selectedItems.length > 1 ? 's' : ''} selected
						</small>
						<small>
							Counting likes and comments since <i>{firstFetchFromDate.format("dddd, MMMM Do YYYY")}</i>
						</small>
					</h3>
					<p><small>Need to exclude yourself or another person? Click the <FaEyeSlash size={14} color={'black'} /> at the right side of the profile.</small></p>
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
						<Link to={`/d/apps/top_fans/${checksum}/scoreboard/reset`} className="btn btn-sm btn-danger pull-right">
							Reset
						</Link>
						<button className="btn btn-sm btn-danger pull-right hide" onClick={cleanup}>
							Reset starting now
						</button>
						<button className="btn btn-sm btn-default pull-right" onClick={fetch}>
							Refresh
						</button>
						<button className="btn btn-sm btn-default pull-right" onClick={generateCsv}>
							Export as CSV
						</button>
						<button className="btn btn-sm btn-default pull-right hide" onClick={fetchDetailsDemo}>
							demo details
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
		{isCurrentlyPolling && entries.length == 0 ?
			<div className="ita-empty text-center">
				<h3>
					Please wait. Fetching activity...
				</h3>
			</div>
		:
			null
		}
		{entries.length == 0 && !isCurrentlyPolling ?
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
				{!tabIntegrated || <p><Link to={`/d/apps/top_fans/${checksum}/scoreboard/reset`}><small>Reset scores</small></Link></p>}
			</div>
		:
			null
		}
		{entries.length ? 
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
					<th className="text-right">
						<span>Ignore</span>
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
						{' | '}
						<Link to={`/d/apps/top_fans/${checksum}/scoreboard/${entry.senderId}`}>Get details</Link>
					</td>
					<td className="text-right">
						<ul className="list-inline list-no-margin">
							<li>
								<FaEyeSlash 
									size={20} 
									color={'black'} 
									style={{cursor: 'pointer'}} 
									title="Ignore all actions from this user" 
									onClick={() => addIgnoredUserIdentifier(entry.senderId)} />
							</li>
						</ul>
					</td>
				</tr>
				)}
			</tbody>
		</Table>
		: null }
	</div>
)

export default Scoreboard