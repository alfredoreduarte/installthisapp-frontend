import React from 'react'
import { ButtonToolbar, Table, DropdownButton, MenuItem } from 'react-bootstrap'
import ReactInterval from 'react-interval'
import FaFlag from 'react-icons/lib/fa/flag'
import SearchForm from 'components/SearchForm'
import User from 'components/User'
import toHHMMSS from 'lib/toHHMMSS'

const Entries = ({ entries, selectedItems, fetchEntries }) => (
	<div className="ita-table-view">
		<div className="ita-table-toolbar">
			<div className="row">
				<div className="col-md-12">
					<h3 className="ita-page-title">
						Entries <br />
						<small className={selectedItems.length ? '' : 'hide'}>
							{' '}
							/ {selectedItems.length} user{selectedItems.length > 1 ? 's' : ''} selected
						</small>
						<small>Updating every 3 seconds</small>
					</h3>
				</div>
			</div>
			<div className="row">
				<div className="col-md-4">
					<div className="hide">
						<SearchForm />
					</div>
				</div>
				<div className="col-md-8 text-right">
					{entries.length == 0 ? null : (
						<ButtonToolbar>
							<button className="btn btn-sm btn-default pull-right" onClick={fetchEntries}>
								Refresh
							</button>
							<ReactInterval timeout={3000} enabled={true} callback={() => fetchEntries()} />
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
							<span>Name</span>
						</th>
						<th>
							<span>Accumulated time</span>
						</th>
						<th>
							<span />
						</th>
					</tr>
				</thead>
				<tbody>
					{entries.map(entry => (
						<tr key={entry.id}>
							<td>
								<User name={entry.user.name} identifier={entry.user.identifier} small />
							</td>
							<td>{toHHMMSS(entry.elapsedSeconds)}</td>
							<td>{entry.hasFlag && <FaFlag className="text-success" size={42} />}</td>
						</tr>
					))}
				</tbody>
			</Table>
		)}
	</div>
)

export default Entries
