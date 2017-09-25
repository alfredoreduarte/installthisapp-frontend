import React, { Component, PropTypes } from 'react'
import Modal from 'react-modal'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'
import User from 'components/User'

const ResetModal = ({
	show,
	firstFetchFromDate,
	handleClose,
	onDateChange,
	reset,
}) =>
<Modal
	isOpen={show}
	onAfterOpen={() => console.log('afteropen')}
	onRequestClose={handleClose}
	contentLabel="Modal"
>
	<a href="javascript:void(0)" onClick={handleClose}><small>← back</small></a>
	<h1>Reset Scoreboard</h1>
	<p>Track likes and comments starting from:</p>
	<div className="col-md-6">
		<SingleDatePicker 
			id="lafecha"
			date={firstFetchFromDate}
			isOutsideRange={day => day.isAfter(moment().subtract(1, 'days')) || day.isBefore(moment().subtract(240, 'days'))}
			numberOfMonths={1}
			focused={true}
			onDateChange={onDateChange}
		/>
		<button 
			style={{marginLeft: '20px'}} 
			onClick={reset} 
			className="btn btn-primary" 
			disabled={firstFetchFromDate ? false : true}>Reset Scoreboard</button>
	</div>
	<div className="col-md-6">
	</div>
</Modal>


export default ResetModal