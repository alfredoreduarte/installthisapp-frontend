import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import _ from 'lodash'
import Select from 'react-select'
import { Link } from 'react-router'
import { Table, DropdownButton, MenuItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Checkbox } from 'react-icheck'
import { getQuestionsForCurrentApp } from 'modules/trivia/selectors/questions'
import { getAllOptions } from 'modules/trivia/selectors/options'
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
	questionsEditPath,
	showCreateModal,
	questionToEdit,
	closeUrl,
}) => (
	<div className="ita-table-view">
		<QuestionsCreate 
			show={showCreateModal} 
			closeUrl={closeUrl} 
			checksum={checksum} 
			initialQuestion={questionToEdit} />
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
				<div className={questions.length > 0 ? "col-md-8 text-right" : "hide"}>
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
				<div className={questions.length > 0 ? "col-md-3 col-md-offset-9" : "hide"}>
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
		{questions.length > 0 ? 
		<Table className="ita-table">
			<thead>
				<tr>
					<th>
						<span>Name</span>
					</th>
					<th>
						<span>Created on</span>
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
								<Link
									to={questionsEditPath + `/${q.id}`}
									className='
										icon-tool-big 
										btn 
										btn-squared 
										glyphicon glyphicon-pencil'></Link>
							</li>
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
		:
		<div className="row">
			<div className="col-sm-12">
				<div className="ita-empty text-center">
					<br />
					<br />
					<h4 className="weight-thin animated fadeInDown">
						There are no questions yet, create the first one
					</h4>
					<br />
					<br />
					<img 
						src="/images/dashboard-empty.png"
						style={{height: '100px'}}
						className="ita-empty-illustration animated fadeInUp" />
					<br />
					<br />
					<p>
						<Link 
							to={questionsCreatePath}
							className="btn btn-success animated fadeInUp">
							Create Question
						</Link>
					</p>
				</div>
			</div>
		</div>
		}
	</div>
)

const mapStateToProps = (state, props) => {
	const questions = getQuestionsForCurrentApp(state, props)
	const allOptions = getAllOptions(state)
	let questionToEdit = null
	if (props.params.questionId && questions.length > 0) {
		const question = _.find(questions, {'id': parseInt(props.params.questionId)})
		const options = _.filter(allOptions, o => {
			return question.options.indexOf(o.id) > -1
		})
		questionToEdit = {
			text: question.text,
			id: question.id,
			options
		}
	} 
	const checksum = props.params.checksum
	const createString = '/create'
	const pathname = props.location.pathname
	const showModal = pathname.indexOf('/questions/create') !== -1 || pathname.indexOf('/questions/edit') !== -1
	return { 
		questions,
		checksum,
		selectedIds: state.selectedItems,
		closeUrl: pathname.substring(0, pathname.length - createString.length),
		questionsCreatePath: props.location.pathname + '/create',
		questionsEditPath: props.location.pathname + '/edit',
		questionToEdit,
		showCreateModal: showModal,
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
			dispatch({
				type: 'RESET_SELECTED_ITEMS'
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Questions)