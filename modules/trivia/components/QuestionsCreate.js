import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import _ from 'lodash'
import update from 'react-addons-update'
import v4 from 'node-uuid'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { postNewQuestion } from 'modules/trivia/actions/questions'
import OptionField from 'modules/trivia/components/OptionField'

class QuestionsCreate extends Component {
	constructor(props) {
		super(props)
		this.state = {
			question: this.props.initialQuestion || this.getDefaultStruct()
		}
		this.resetForm = this.resetForm.bind(this)
		this.close = this.close.bind(this)
		this.handleAddOption = this.handleAddOption.bind(this)
		this.handleDeleteOption = this.handleDeleteOption.bind(this)
		this.getCorrectState = this.getCorrectState.bind(this)
		this.getDefaultStruct = this.getDefaultStruct.bind(this)
		this.getOptionDefaultStruct = this.getOptionDefaultStruct.bind(this)
		this.handleQuestionChange = this.handleQuestionChange.bind(this)
		this.handleOptionChange = this.handleOptionChange.bind(this)
		this.handleOptionToggle = this.handleOptionToggle.bind(this)
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			question: nextProps.initialQuestion || this.getDefaultStruct()
		})
	}
	resetForm(){
		this.setState({
			question: this.getDefaultStruct()
		})
	}
	getCorrectState(){
		this.state
		if (this.state) {
			const len = _.filter(this.state.question.options, o => o.correct)
			if (len.length > 0) {
				return false
			}
			else{
				return true
			}
		}
		else{
			return true
		}
	}
	getOptionDefaultStruct(){
		return {
			text: null,
			correct: this.getCorrectState(),
			position: 0,
			deleted: false,
			_destroy: false,
			id: v4()
		}
	}
	getDefaultStruct() {
		return {
			text: '',
			options: [
				this.getOptionDefaultStruct()
			]
		}
	}
	handleDeleteOption(id) {
		const options = this.state.question.options.map(option => {
			if (option.id == id) {
				option['_destroy'] = true
			}
			return option
		})
		console.log('new options', options)
		const newData = update(this.state.question, {
			options: {$set: options}
		})
		this.setState({
			question: newData
		}, () => {
			const correctOption = _.filter(this.state.question.options, {'correct': true, '_destroy': false})
			console.log('corrects', correctOption)
			if (correctOption.length == 0) {
				const newCorrect = _.find(this.state.question.options, {'_destroy': false})
				this.handleOptionToggle(newCorrect.id)
			}
		})
	}
	handleAddOption() {
		const newIndex = this.state.question.options.length
		const option = this.getOptionDefaultStruct()
		const newState = update(this.state.question, {
			options: {$push: [option]}
		})
		this.setState({
			question: newState
		})
	}
	handleQuestionChange(e){
		const newQuestionState = Object.assign({}, this.state.question, {
			text: e.target.value
		})
		this.setState({
			question: newQuestionState
		})
	}
	handleOptionChange(val, index){
		const beingChanged = _.find(this.state.question.options, {'id': index})
		const newArray = this.state.question.options
		const newElem = beingChanged
		newElem.text = val
		newArray[newArray.indexOf(beingChanged)] = newElem
		const newOptionsState = Object.assign({}, this.state.question, {
			options: newArray
		})
		this.setState({
			question: newOptionsState
		})
	}
	handleOptionToggle(index){
		console.log('handleOptionToggle', index)
		const beingChanged = _.find(this.state.question.options, {'id': index})

		console.log('beingChanged', beingChanged)
		const changedArray = this.state.question.options.map(elem => {
			elem.correct = elem.id == beingChanged.id ? true : false 
			return elem
		})
		const newOptionsState = Object.assign({}, this.state.question, {
			options: changedArray
		})
		this.setState({
			question: newOptionsState
		})
	}
	close(){
		this.resetForm()
		browserHistory.push(this.props.closeUrl)		
	}
	render() {
		const { show, handleSubmit, closeUrl } = this.props
		const { question } = this.state
		const { 
			resetForm,
			close,
			handleDeleteOption,
			handleQuestionChange, 
			handleOptionChange, 
			handleOptionToggle, 
			handleAddOption
		} = this
		return (
			<Modal show={show} onHide={close}>
				<Modal.Header closeButton>
					<Modal.Title>New question</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="form-group">
						<label className="h4">Question</label>
						<input 
							type="text" 
							value={question.text} 
							className="form-control"
							onChange={handleQuestionChange} />
					</div>
					<div className="form-group">
						<label>Options</label>
					</div>
					{question.options.map(option => {
						if (option['_destroy']) {return}
						return <OptionField 
									key={option.id} 
									text={option.text}
									correct={option.correct}
									onChange={e => handleOptionChange(e.target.value, option.id)}
									onDelete={e => handleDeleteOption(option.id)}
									onToggle={() => handleOptionToggle(option.id)} />
					})}
					<div className="form-group">
						<p className="text-right"><Button 
							className="btn btn-xs btn-primary" 
							onClick={() => handleAddOption()}
							>Add Option
						</Button></p>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button 
						className="btn btn-lg btn-success" 
						onClick={() => {
							handleSubmit(question)
							resetForm()
						}}>
						Save Question
					</Button>
				</Modal.Footer>
			</Modal>
		)
	}
}

const mapStateToProps = (state, props) => {
	return {
		
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		handleSubmit: obj => {
			dispatch(postNewQuestion(props.checksum, obj))
			browserHistory.push(props.closeUrl)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsCreate)