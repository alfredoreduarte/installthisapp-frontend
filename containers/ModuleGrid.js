import React, { PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { push } from 'react-router-redux'
import { setNewAppModule } from 'actions/newApp'

const ModuleGrid = ({ modules, handleModuleSelection }) => (
	<div className="container-fluid">
		{modules.map( module => {
			return (
				<div className="col-md-4" key={module}>
					<div className="media media-stacked text-center">
						<div className="media-left media-middle">
							<a
								href="javascript:void()"
								onClick={() => handleModuleSelection(module)}>
								<img 
									className="media-object img-rounded" 
									src={`/images/module-icons/${module}.png`} />
							</a>
						</div>
						<div className="media-body media-middle">
							<a
								href="javascript:void()"
								onClick={() => handleModuleSelection(module)}>
								<h5 
								className="
									media-heading 
									text-relevant-title 
									weight-normal 
									font-size-large 
									text-capitalize">
									{_.replace(module, '_', ' ')}
								</h5>
							</a>
							<p>
								<small>Description Mattis Sem Malesuada Tortor</small>
							</p>
						</div>
					</div>
				</div>
			)
		})}
	</div>
)

const mapStateToProps = (state, props) => {
	return { 
		modules: ['trivia']
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	handleModuleSelection: type => {
		dispatch(setNewAppModule(type))
		dispatch(push('/d/apps/create/2'))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(ModuleGrid)