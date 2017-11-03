import React from 'react'
import { Checkbox } from 'react-icheck'
import TimeAgo from 'react-timeago'
import { ButtonToolbar, Table, DropdownButton, MenuItem } from 'react-bootstrap'
import SearchForm from 'components/SearchForm'
import User from 'components/User'

const Photos = ({
	entries,
	selectedItems,
	fetchEntries,
	getRandomWinner,
	handleDelete,
	handleDeleteBatch,
	handleSelect,
	handleSelectBatch,
	randomWinner,
	winnerModalVisible,
	closeWinnerModal,
	generateCsv,
}) => (
	<div className="ita-table-view">
		<div className="ita-table-toolbar">
			<div className="row">
				<div className="col-md-12">
					<h3 className="ita-page-title">
						Entries
						<small className={selectedItems.length ? '' : 'hide'}>
							{' '}
							/ {selectedItems.length} user{selectedItems.length > 1 ? 's' : ''} selected
						</small>
					</h3>
				</div>
			</div>
			<div className="row">
				<div className="col-md-4">
					<SearchForm />
				</div>
				<div className="col-md-8 text-right">
					{entries.length == 0 ? null : (
						<ButtonToolbar>
							<button className="btn btn-sm btn-default pull-right" onClick={fetchEntries}>
								Refresh
							</button>
							<button className="btn btn-default btn-sm pull-right" onClick={getRandomWinner}>
								Get random winner
							</button>
							<button className="btn btn-sm btn-default pull-right" onClick={generateCsv}>
								Export as CSV
							</button>
						</ButtonToolbar>
					)}
					<ul className="ita-table-tools-selected list-inline list-no-margin">
						<li className={selectedItems.length ? '' : 'hide'}>
							<a
								href="javascript:void(0)"
								className="
									icon-tool-big 
									btn 
									btn-squared 
									glyphicon 
									glyphicon-cloud-download"
							/>
						</li>
					</ul>
				</div>
				<div className="col-md-3 col-md-offset-9">
					<div className="ita-table-view-second-row hide" />
				</div>
			</div>
		</div>
		{entries.length == 0 ? (
			<div className="ita-empty text-center">
				<h3>There are no entries yet</h3>
			</div>
		) : (
			<Table className="ita-table">
				<thead>
					<tr>
						<th>
							<span>User</span>
						</th>
						<th>
							<span>Photo</span>
						</th>
						<th>
							<span>Votes</span>
						</th>
						<th>
							<span>Posted on</span>
						</th>
						<th className="text-right">
							<Checkbox
								checked={entries.length > 0 && selectedItems.length == entries.length}
								checkboxClass="icheckbox-ita icon-tool-big pull-right"
								// onChange={() => handleSelectBatch(photos)}
							/>
						</th>
					</tr>
				</thead>
				<tbody>
					{entries.map(entry => (
						<tr key={entry.id}>
							<td>
								<User name={entry.user.name} identifier={entry.user.identifier} small />
							</td>
							<td>
								<img src={entry.attachmentUrl} style={{ width: '100px' }} className="img-responsive img-rounded" />
							</td>
							<td>{entry.votesCount}</td>
							<td>
								<TimeAgo date={entry.createdAt} />
							</td>
							<td className="text-right">
								<ul className="list-inline list-no-margin">
									<li>
										<a
											onClick={() => handleDelete(entry.id)}
											className="
											icon-tool-big 
											btn 
											btn-squared 
											glyphicon glyphicon-trash"
										/>
									</li>
									<li>
										<Checkbox
											checked={selectedItems.indexOf(entry.id) !== -1 ? true : false}
											checkboxClass="icheckbox-ita icon-tool-big pull-right"
											onChange={() => handleSelect(entry.id)}
										/>
									</li>
								</ul>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		)}
	</div>
)

export default Photos
