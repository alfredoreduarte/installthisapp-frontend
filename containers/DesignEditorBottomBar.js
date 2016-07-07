import React, { Component, PropTypes } from 'react'
import Select from'react-select'

const DesignEditorBottomBar = ({
	screens = [
		{ value: 'index', label: 'Inicio'},
		{ value: 'thanks', label: 'Gracias'},
	],
	defaultScreen = 'index',
	handleScreenChange = e => {
		console.log('screen changed!', e.label)
	},
	platform = 'mobile',
	handleDeviceChange = device => {
		console.log('device changed!', device)
	},
	resetToDefaults = () => console.log('reset to defaults!')
}) => (
	<div className="ita-bottom-bar">
		<Select
			clearable={false}
			className="react-select-top"
			searchable={false}
			style={{width: '200px'}}
			value={_.find(screens, {'value': defaultScreen})}
			options={screens}
			onChange={handleScreenChange}
		/>
		<div className="btn-group ita-btn-group-editor" role="group" data-toggle="buttons">
			<button 
				type="button" 
				className={`btn ${platform == 'facebook' ? 'active' : null}`} 
				onClick={() => handleDeviceChange('facebook')}>
				<span className="glyphicon glyphicon-king"></span>
			</button>
			<button 
				type="button" 
				className={`btn ${platform == 'mobile' ? 'active' : null}`} 
				onClick={() => handleDeviceChange('mobile')}>
				<span className="glyphicon glyphicon-phone"></span>
			</button>
		</div>
		<small 
			className="text-muted" 
			onClick={() => resetToDefaults()} 
			style={{cursor: 'pointer'}}>
			<i className="glyphicon glyphicon-fast-backward"></i> Reset to defaults
		</small>
	</div>
)

export default DesignEditorBottomBar