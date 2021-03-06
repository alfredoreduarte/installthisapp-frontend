import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import _ from 'lodash'
import TimeAgo from 'react-timeago'
import Select from 'react-select'
import { Link } from 'react-router'
import { Table, DropdownButton, MenuItem, ButtonToolbar } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Checkbox } from 'react-icheck'
import { getAnswersForCurrentApp } from 'modules/trivia/selectors/answers'
import { selectItemOnTable } from 'actions/users'
import SearchForm from 'components/SearchForm'
import { fetchEntities } from 'modules/trivia/actions/entities'
import { postDeleteAnswers } from 'modules/trivia/actions/answers'
import User from 'components/User'

const Answers = ({
	answers,
	checksum,
	selectedIds,
	handleSelect, 
	handleSelectBatch,
	handleDelete,
	handleDeleteBatch,
	fetchAgain,
}) => (
	<div className="ita-table-view">
		<div className="ita-table-toolbar">
			<div className="row">
				<div className="col-md-12">
					<h3 className="ita-page-title">
						Answers 
						<small className={selectedIds.length ? '' : 'hide'}>
							{' '}/ {selectedIds.length} 
							{' '}answer{selectedIds.length > 1 ? 's' : ''} selected
						</small>
					</h3>
				</div>
			</div>
			<div className="row">
				<div className="col-md-12 text-right">
					<ButtonToolbar>
						<button className="btn btn-sm btn-default pull-right" onClick={fetchAgain}>
							Refresh table
						</button>
					</ButtonToolbar>
				</div>
			</div>
			<div className="row">
				<div className={answers.length > 0 ? "col-md-12 text-right" : "hide"}>
					<ul className="ita-table-tools-selected list-inline list-no-margin">
						<li className={selectedIds.length ? '' : 'hide'}>
							<a
								onClick={() => handleDeleteBatch(answers)}
								className="
									icon-tool-big 
									btn 
									btn-squared 
									glyphicon glyphicon-trash"
								>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		{answers.length > 0 ? 
		<Table className="ita-table">
			<thead>
				<tr>
					<th>
						<span>User</span>
					</th>
					<th>
						<span>Last answered</span>
					</th>
					<th>
						<span>Score</span>
					</th>
					<th className="text-right">
						<Checkbox 
							checked={answers.length > 0 && selectedIds.length == answers.length}
							checkboxClass="icheckbox-ita icon-tool-big pull-right"
							onChange={() => handleSelectBatch(answers)}
						 />
					</th>
				</tr>
			</thead>
			<tbody>
				{answers.map(a => 
				<tr key={a.id}>
					<td>
						<User name={a.user.name} identifier={a.user.identifier} small />
					</td>
					<td>
						<TimeAgo date={a.updatedAt} />
					</td>
					<td>
						<div className="progress ita-progressbar">
							<div 
								className="progress-bar progress-bar-success" 
								style={{width: a.qualification + '%'}}>
								<div className="ita-progressbar-label-default">
									{parseInt(a.qualification)} %</div>
								<div className="ita-progressbar-label-hover">
									{a.totalCorrectAnswers} correct</div>
							</div>
							<div 
								className="progress-bar progress-bar-danger" 
								style={{width: parseInt(100 - a.qualification) + '%'}}>
								<div className="ita-progressbar-label-default">
									{parseInt((a.totalAnswers - a.totalCorrectAnswers) * 100 / a.totalAnswers) } %
								</div>
								<div className="ita-progressbar-label-hover">
									{a.totalAnswers - a.totalCorrectAnswers} incorrect
								</div>
							</div>
						</div>
					</td>
					<td className="text-right">
						<ul className="list-inline list-no-margin">
							<li>
								<a
									onClick={() => handleDelete(a.id)}
									className='
										icon-tool-big 
										btn 
										btn-squared 
										glyphicon glyphicon-trash'></a>
							</li>
							<li>
								<Checkbox 
									checked={selectedIds.indexOf(a.id) !== -1 ? true : false}
									checkboxClass="icheckbox-ita icon-tool-big pull-right"
									onChange={() => handleSelect(a.id)}
								/>
							</li>
						</ul>
					</td>
				</tr>
				)}
			</tbody>
		</Table>
		:
		<div className="row">
			<div className="col-sm-12">
				<div className="ita-empty text-center">
					<br />
					<br />
					<h4 className="weight-thin animated fadeInDown">
						There are no answers yet
					</h4>
					<br />
					<br />
					<img 
						src="/images/dashboard-empty.png"
						style={{height: '100px'}}
						className="ita-empty-illustration animated fadeInUp" />
				</div>
			</div>
		</div>
		}
	</div>
)

const mapStateToProps = (state, props) => {
	const answers = getAnswersForCurrentApp(state, props)
	const checksum = props.params.checksum
	return { 
		answers,
		checksum,
		selectedIds: state.selectedItems,
	}
}

const mapDispatchToProps = (dispatch, props) => {
	dispatch(fetchEntities(props.params.checksum))
	return {
		fetchAgain: () => dispatch(fetchEntities(props.params.checksum)),
		handleSelect: id => {
			dispatch(selectItemOnTable(id))
		},
		handleSelectBatch: questions => {
			questions.map(q => dispatch(selectItemOnTable(q.id)))
		},
		handleDelete: id => {
			dispatch(postDeleteAnswers(props.params.checksum, [id]))
		},
		handleDeleteBatch: questions => {
			const ids = questions.map(q => q.id)
			dispatch(postDeleteAnswers(props.params.checksum, ids))
			dispatch({
				type: 'RESET_SELECTED_ITEMS'
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Answers)