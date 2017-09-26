import React, { Component, PropTypes } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router'
import { Animate } from 'react-move'
import Modal from 'react-modal'
import FacebookLogin from 'react-facebook-login'
import FaEnvelope from 'react-icons/lib/fa/envelope'
import MdCloud from 'react-icons/lib/md/cloud'
import MdClose from 'react-icons/lib/md/close'
import MdChevronRight from 'react-icons/lib/md/chevron-right'
import FlipCard from 'components/FlipCard'
import FbPhoto from 'components/FbPhoto'
import FacebookConnectContainer from 'leadgen/containers/FacebookConnectContainer'
import DestinationCreator from 'leadgen/containers/DestinationCreator'
import SourceCreator from 'leadgen/containers/SourceCreator'
import Destination from 'leadgen/components/Destination'
import StepLabel from 'leadgen/components/StepLabel'
import Source from 'leadgen/components/Source'
import SourceTestModalContainer from 'leadgen/containers/SourceTestModalContainer'
import SuccessModal from 'leadgen/components/SuccessModal'
// import SuccessfulPurchase from 'components/SuccessfulPurchase'

const AdminDashboard = ({ 
	hideDestinationSuccessModal,
	showDestinationSuccessModal,
	fetchingLeadgenForm,
	hasSelectedPage,
	hasSelectedForm,
	handleDeleteFbLeadform,
	handleDeleteFbLeadDestination,
	// handlePageChange,
	// 
	testStatus,
	sendTest,
	fbProfile,
	connectingToFacebook,
	fbLoginCallback,
	fbLeadforms,
	fbLeadDestinations,
	// fbPages,
	fbLeadgenForms,
	hideSourcesForm,
	showSourcesForm,
	hideDestinationsForm,
	showDestinationsForm,
	showDestinationsFormWithDefaultSourceId,
	// 
	isEditingForm,
	editSource,
	sourcesFormVisible,
	editingDestinationId,
	editDestination,
	isEditingDestination,
	destinationsFormVisible,
	// sources testing
	showSourceTestModal,
	sendSourceTest,
	handleSourceTestModalHide,
	sourceForTesting,
}) => (
	<div>
		<SourceTestModalContainer />
		{showDestinationSuccessModal ? 
			<SuccessModal 
				testStatus={testStatus}
				sendTest={() => sendTest(showDestinationSuccessModal.fbLeadformId)}
				showDestinationSuccessModal={showDestinationSuccessModal}
				hideDestinationSuccessModal={hideDestinationSuccessModal}
			/>
		: null}
		{!fbProfile ? 
			<FacebookConnectContainer />
		:
			<div>
				<div className="col-md-12 text-center" style={{marginBottom: '40px'}}>
					<p><FbPhoto 
						identifier={parseInt(fbProfile.identifier)} 
						width={42} 
						height={42} 
						className="img-circle"
					/></p>
					<h4><b>{fbProfile.name}</b></h4>
					<p><small><FacebookLogin
						appId={process.env.FB_APP_ID}
						autoLoad={false}
						scope={'manage_pages'}
						fields="name,email,picture"
						style={{cursor: 'pointer'}}
						cssClass="btn btn-default btn-xs"
						textButton={connectingToFacebook ? 'Please wait...' : 'Refresh permissions'}
						callback={fbLoginCallback}
						tag="a" />
					</small></p>
				</div>
				{fbLeadforms.length == 0 && !connectingToFacebook ? 
					<div className="col-md-12 text-center">
						<StepLabel number={1} />
						<h3>Create a <i>Source</i> <br/><small><i>noun</i> | one of your Facebook Leadgen Forms</small></h3>
					</div>
				: null}
				{!connectingToFacebook ? 
				<div className="col-md-12" style={{display: 'flex', justifyContent: 'space-around'}} >
					<div className="Leadgen-column">
						<FlipCard disabled={true} flipped={sourcesFormVisible || !fbLeadforms.length } style={{width: '100%'}}>
							<div>
								<div style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
									padding: '15px 0px',
								}}>
									<p className="text-center h3" style={{margin: '0px'}}>Sources</p>
									<button className="btn btn-primary btn-sm" onClick={showSourcesForm}>Add Form</button>
								</div>
								{fbLeadforms.length > 0 ? 
									<ul className="list-group" style={{marginBottom: '0px'}}>
										{fbLeadforms.map(fbLeadform =>
											<Source
												key={fbLeadform.id}
												id={fbLeadform.id}
												sendTest={() => showSourceTestModal(fbLeadform.id)}
												fbPageName={fbLeadform.fbPageName}
												fbFormId={fbLeadform.fbFormId}
												destinationsAmount={fbLeadform.fbLeadDestinations.length}
												handleDelete={handleDeleteFbLeadform}
												handleEdit={() => editSource(fbLeadform.id)}
												handleAddDestination={() => showDestinationsFormWithDefaultSourceId(fbLeadform.id)}
											/>
										)}
									</ul>
								: null }
							</div>
							<div className="panel panel-default">
								<div className="panel-body">
									<div className={!fbLeadforms.length ? 'hide' : null} style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										marginBottom: '20px',
									}}>
										<p className="text-center h3" style={{margin: '0px'}}>
											{isEditingForm ? 'Edit Source' : 'New Source'}
										</p>
										<MdClose size="16" className={!fbLeadforms.length ? 'hide' : null} onClick={() => {
											hideSourcesForm()
										}} style={{cursor: 'pointer'}} />
									</div>
									<SourceCreator />
								</div>
								{fbLeadforms.length == 0 ? 
									<p className="text-center"><small><a 
										href="http://blog.installthisapp.com/creating-facebook-lead-ads/" 
										target="_blank" rel="noopener">What is a Facebook Leadgen Form?</a></small></p>
								: null}
							</div>
						</FlipCard>
					</div>
					{fbLeadforms.length ? <MdChevronRight size="20" style={{marginTop: '80px'}} /> : null}
					{fbLeadforms.length ? 
						<div className="Leadgen-column">
							<FlipCard disabled={true} flipped={destinationsFormVisible} style={{width: '100%'}}>
								<div>
									<div style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										padding: '15px 0px',
									}}>
										<p className="text-center h3" style={{margin: '0px'}}>Destinations</p>
										<button className="btn btn-primary btn-sm" onClick={showDestinationsForm}>
											Add Destination
										</button>
									</div>
									{fbLeadDestinations.length > 0 ? 
										<div><ul className="list-group" style={{marginBottom: '0px'}}>
											{fbLeadDestinations.map(fbLeadDestination =>
												<Destination
													key={fbLeadDestination.id}
													id={fbLeadDestination.id}
													destinationType={fbLeadDestination.destinationType}
													fbPageName={fbLeadDestination.fbPageName}
													fbFormId={fbLeadDestination.fbFormId}
													status={fbLeadDestination.status}
													handleDelete={handleDeleteFbLeadDestination}
													handleEdit={() => editDestination(fbLeadDestination.id)}
												/>
											)}
										</ul></div>
									: null }
								</div>
								<div className="panel panel-default">
									<div className="panel-body">
										{!isEditingDestination ? <StepLabel number={4} /> : null}
										<div style={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'space-between',
											marginBottom: '20px',
										}}>
											<p className="text-center h3" style={{margin: '0px'}}>
												{isEditingDestination ? 'Edit Destination' : 'New Destination'}
											</p>
											<MdClose size="16" className="" onClick={() => {
												hideDestinationsForm()
											}} style={{cursor: 'pointer'}} />
										</div>
										<DestinationCreator />
									</div>
								</div>
							</FlipCard>
						</div>
					: null }
				</div>
				: null }
			</div>
		}
		<ol className="hide">
			<li>Connect with Facebook</li>
			<li>Add a destination</li>
			<li>Select a Source: Page, ad, destination</li>
		</ol>
		<svg className="hide" width="224" height="660">
			<g fill="none" stroke="#dfe4e9" strokeOpacity="0.52">
				<path d="M0,330.6C89.60000000000001,330.6, 134.4,30.6 224,30.6" strokeWidth="3.5999999999999996"></path>
			</g>
		</svg>
	</div>
)
export default AdminDashboard