import React, { PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { push } from 'react-router-redux'
import { setNewAppModule, setAppNotAvailable } from 'actions/newApp'

const ModuleGrid = ({ modules, futureModules, handleFutureModuleSelection, handleModuleSelection }) => (
	<div>
		<div className="container-flex">
			{modules.map(module => {
				return (
					<div className="col-flex animated fadeInUp" key={module} style={{ margin: '0px 40px 20px' }}>
						<div className="media media-stacked text-center media-module-option">
							<div className="media-left media-middle">
								<a href="javascript:void(0)" onClick={() => handleModuleSelection(module)}>
									<img className="media-object img-rounded" src={`/images/module-icons/${module}.jpg`} />
								</a>
							</div>
							<div className="media-body media-middle">
								<div onClick={() => handleModuleSelection(module)}>
									<h5 className="
										media-heading 
										text-relevant-title 
										weight-normal 
										font-size-large 
										text-capitalize">
										{_.capitalize(module.split('_').join(' '))}
									</h5>
								</div>
								<p className="hide">
									<small>Description Mattis Sem Malesuada Tortor</small>
								</p>
							</div>
						</div>
					</div>
				)
			})}
		</div>
		<h3 className="text-center" style={{ marginTop: '120px' }}>
			Coming soon
		</h3>
		<p className="text-center" style={{ marginBottom: '40px' }}>
			We're currently developing these apps
		</p>
		<div className="container-flex">
			{futureModules.map(module => {
				return (
					<div className="col-flex" key={module}>
						<div className="media media-stacked text-center media-module-option">
							<div className="media-left media-middle">
								<a href="javascript:void(0)">
									<img className="media-object img-rounded" src={`/images/module-icons/${module}.jpg`} />
								</a>
							</div>
							<div className="media-body media-middle">
								<div>
									<h5 className="
										media-heading 
										text-relevant-title 
										weight-normal 
										font-size-large 
										text-capitalize">
										{_.capitalize(module.split('_').join(' '))}
									</h5>
								</div>
								<p className="hide">
									<small>Description Mattis Sem Malesuada Tortor</small>
								</p>
							</div>
						</div>
					</div>
				)
			})}
		</div>
	</div>
)

const mapStateToProps = state => ({
	modules: state.modules.active,
	futureModules: state.modules.inactive,
})

const mapDispatchToProps = (dispatch, props) => ({
	handleFutureModuleSelection: type => dispatch(setAppNotAvailable(type)),
	handleModuleSelection: type => {
		dispatch(setNewAppModule(type))
		dispatch(push('/d/apps/create/3'))
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(ModuleGrid)
