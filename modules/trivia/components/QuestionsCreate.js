import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
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
		this.close = this.close.bind(this)
		this.handleAddOption = this.handleAddOption.bind(this)
		this.getDefaultStruct = this.getDefaultStruct.bind(this)
		this.getOptionDefaultStruct = this.getOptionDefaultStruct.bind(this)
		this.handleQuestionChange = this.handleQuestionChange.bind(this)
		this.handleOptionChange = this.handleOptionChange.bind(this)
		this.handleOptionToggle = this.handleOptionToggle.bind(this)
	}
	getOptionDefaultStruct(){
		return {
			text: null,
			correct: false,
			position: 0,
			deleted: false,
			_tmpId: v4()
		}
	}
	getDefaultStruct() {
		return {
			text: null,
			options: [
				this.getOptionDefaultStruct()
			]
		}
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
		const beingChanged = _.find(this.state.question.options, {'_tmpId': index})
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
		const beingChanged = _.find(this.state.question.options, {'_tmpId': index})
		const changedArray = this.state.question.options.map(elem => {
			elem.correct = elem._tmpId == beingChanged._tmpId ? true : false 
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
		browserHistory.push(this.props.closeUrl)
	}
	render() {
		const { show, handleSubmit, closeUrl } = this.props
		return (
			<Modal show={show} onHide={this.close}>
				<Modal.Header closeButton>
					<Modal.Title>New question</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="form-group">
						<label className="h4">Question</label>
						<input 
							type="text" 
							value={this.state.question.text} 
							className="form-control"
							onChange={this.handleQuestionChange} />
					</div>
					<div className="form-group">
						<label>Options</label>
					</div>
					{this.state.question.options.map(option => (
						<OptionField 
							key={option._tmpId} 
							text={option.text}
							correct={option.correct}
							onChange={e => this.handleOptionChange(e.target.value, option._tmpId)}
							onToggle={() => this.handleOptionToggle(option._tmpId)} />
						)
					)}
					<div className="form-group">
						<p className="text-right"><Button 
							className="btn btn-xs btn-primary" 
							onClick={() => this.handleAddOption()}
							>Add Option
						</Button></p>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button 
						className="btn btn-lg btn-success" 
						onClick={() => handleSubmit(this.state.question)}>
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
			dispatch(postNewQuestion(obj))
			browserHistory.push(props.closeUrl)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsCreate)