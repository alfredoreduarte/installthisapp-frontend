import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { push } from 'react-router-redux'
import { setNewAppModule } from 'actions/newApp'

const ModuleGrid = ({ modules, handleModuleSelection }) => (
	<div className="container-fluid">
		{modules.map( module => {
			return (
				<div className="col-md-3" key={module}>
					<div onClick={() => handleModuleSelection(module)}>{module}</div>
				</div>
			)
		})}
	</div>
)

const mapStateToProps = (state, props) => {
	return { 
		modules: ['trivia', 'top_fans']
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	handleModuleSelection: type => {
		dispatch(setNewAppModule(type))
		dispatch(push('/create/2'))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(ModuleGrid)