import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import Select from 'react-select'
import { Link } from 'react-router'
import { Table, DropdownButton, MenuItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Checkbox } from 'react-icheck'
import { getQuestionsForCurrentApp } from 'modules/trivia/selectors/questions'
import { selectItemOnTable, sortUsersBy } from 'actions/users'
import SearchForm from 'components/SearchForm'
import User from 'components/User'
import { fetchTriviaEntities } from 'modules/trivia/actions/entities'
import { postDeleteQuestions } from 'modules/trivia/actions/questions'
import QuestionsCreate from 'modules/trivia/components/QuestionsCreate'

const Questions = ({
	questions,
	checksum,
	selectedIds,
	handleSelect, 
	handleSelectBatch,
	handleDelete,
	handleDeleteBatch,
	questionsCreatePath,
	showCreateModal,
	closeUrl,
}) => (
	<div className="ita-table-view">
		<QuestionsCreate show={showCreateModal} closeUrl={closeUrl} checksum={checksum} />
		<div className="ita-table-toolbar">
			<div className="row">
				<div className="col-md-12">
					<h3 className="ita-page-title">
						Questions 
						<small className={selectedIds.length ? '' : 'hide'}>
							{' '}/ {selectedIds.length} 
							{' '}question{selectedIds.length > 1 ? 's' : ''} selected
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
						<li className={selectedIds.length ? '' : 'hide'}>
							<a
								onClick={() => handleDeleteBatch(questions)}
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
				<div className="col-md-3 col-md-offset-9">
					<div className="ita-table-view-second-row text-right">
						<Link 
							to={questionsCreatePath}
							className="btn btn-sm btn-success">
							Create Question
						</Link>
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
							checked={questions.length > 0 && selectedIds.length == questions.length}
							checkboxClass="icheckbox-ita icon-tool-big pull-right"
							onChange={() => handleSelectBatch(questions)}
						 />
					</th>
				</tr>
			</thead>
			<tbody>
				{questions.map(q => 
				<tr key={q.id}>
					<td>
						{q.text}
					</td>
					<td>
						{q.createdOn}
					</td>
					<td className="text-right">
						<ul className="list-inline list-no-margin">
							<li>
								<a
									onClick={() => handleDelete(q.id)}
									className='
										icon-tool-big 
										btn 
										btn-squared 
										glyphicon glyphicon-trash'></a>
							</li>
							<li>
								<Checkbox 
									checked={selectedIds.indexOf(q.id) !== -1 ? true : false}
									checkboxClass="icheckbox-ita icon-tool-big pull-right"
									onChange={() => handleSelect(q.id)}
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
	const checksum = props.params.checksum
	const questions = getQuestionsForCurrentApp(state, props)
	const createString = '/create'
	const pathname = props.location.pathname
	return { 
		questions,
		checksum,
		selectedIds: state.selectedItems,
		closeUrl: pathname.substring(0, pathname.length - createString.length),
		questionsCreatePath: props.location.pathname + '/create',
		showCreateModal: props.location.pathname.indexOf('/questions/create') !== -1,
	}
}

const mapDispatchToProps = (dispatch, props) => {
	dispatch(fetchTriviaEntities(props.params.checksum))
	return {
		handleSelect: id => {
			dispatch(selectItemOnTable(id))
		},
		handleSelectBatch: questions => {
			questions.map(q => dispatch(selectItemOnTable(q.id)))
		},
		handleDelete: id => {
			dispatch(postDeleteQuestions(props.params.checksum, [id]))
		},
		handleDeleteBatch: questions => {
			const ids = questions.map(q => q.id)
			dispatch(postDeleteQuestions(props.params.checksum, ids))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Questions)