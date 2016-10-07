import React, { PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { push } from 'react-router-redux'
import { setNewAppModule } from 'actions/newApp'

const ModuleGrid = ({ modules, futureModules, handleFutureModuleSelection, handleModuleSelection }) => (
	<div className="container-flex">
		{modules.map( module => {
			return (
				<div className="col-flex" key={module}>
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
									{_.capitalize(_.replace(module, '_', ' '))}
								</h5>
							</a>
							<p className="hide">
								<small>Description Mattis Sem Malesuada Tortor</small>
							</p>
						</div>
					</div>
				</div>
			)
		})}
		{futureModules.map( module => {
			return (
				<div className="col-flex" key={module}>
					<div className="media media-stacked text-center">
						<div className="media-left media-middle">
							<a
								href="javascript:void()"
								onClick={() => handleFutureModuleSelection(module)}>
								<img 
									className="media-object img-rounded" 
									src={`/images/module-icons/${module}.png`} />
							</a>
						</div>
						<div className="media-body media-middle">
							<a
								href="javascript:void()"
								onClick={() => handleFutureModuleSelection(module)}>
								<h5 
								className="
									media-heading 
									text-relevant-title 
									weight-normal 
									font-size-large 
									text-capitalize">
									{_.capitalize(_.replace(module, '_', ' '))}
								</h5>
							</a>
							<p className="hide">
								<small>Description Mattis Sem Malesuada Tortor</small>
							</p>
						</div>
					</div>
				</div>
			)
		})}
	</div>
)

const mapStateToProps = state => ({ 
	modules: ['trivia', 'top_fans', 'photo_contest'],
	futureModules: ['forms', 'puzzle', 'memory_match'],
})

const mapDispatchToProps = (dispatch, props) => ({
	handleFutureModuleSelection: type => {
		// dispatch(setNewAppModule(type))
		// dispatch(push('/d/apps/create/2'))
		console.log('future module!')
	},
	handleModuleSelection: type => {
		dispatch(setNewAppModule(type))
		dispatch(push('/d/apps/create/2'))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(ModuleGrid)