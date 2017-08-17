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
import DestinationCreator from 'leadgen/containers/DestinationCreator'
import SourceCreator from 'leadgen/containers/SourceCreator'
import Destination from 'leadgen/components/Destination'
import Source from 'leadgen/components/Source'
import SuccessModal from 'leadgen/components/SuccessModal'
// import SuccessfulPurchase from 'components/SuccessfulPurchase'

const AdminDashboard = ({ 
	hideDestinationSuccessModal,
	showDestinationSuccessModal,
	adminId,
	adminName,
	fetchingLeadgenForm,
	hasSelectedPage,
	hasSelectedForm,
	handleDeleteFbLeadform,
	handleDeleteFbLeadDestination,
	// handlePageChange,
	// 
	// sendTest,
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
	// 
	sourcesFormVisible,
	destinationsFormVisible,
}) => (
	<div>
		{showDestinationSuccessModal ? 
			<SuccessModal 
				showDestinationSuccessModal={showDestinationSuccessModal}
				showDestinationSuccessModal={showDestinationSuccessModal}
			/>
		: null}
		{!fbProfile ? 
			<div className="col-md-12 text-center" style={{marginBottom: '40px'}}>
				<br/>
				<br/>
				<p><img
					src={`/images/user-placeholders/${adminId % 8}.png`}
					width="72px"
					height="72px"
				/></p>
				<h2>Welcome, {adminName}</h2>
				<h4><b>Connect your Facebook Profile</b></h4>
				<br/>
				<br/>
				<p>
					{connectingToFacebook ?
						<button className="btn btn-primary btn-lg" disabled={true}>
							Please wait...
						</button>
					:
						<FacebookLogin
							appId={process.env.FB_APP_ID}
							autoLoad={true}
							scope={'manage_pages'}
							textButton={'Connect to Facebook'}
							fields="name,email,picture"
							cssClass="btn btn-primary btn-lg"
							callback={fbLoginCallback} />
					}
				</p>
			</div>
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
						cssClass=""
						textButton={connectingToFacebook ? 'Please wait...' : 'Refresh permissions'}
						callback={fbLoginCallback}
						tag="a" />
					</small></p>
				</div>
				{fbLeadforms.length == 0 ? 
					<div className="col-md-12 text-center">
						<h4>Select one of your Facebook Leadgen Forms</h4>
					</div>
				: null}
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
									<p className="text-center h3" style={{margin: '0px'}}>Forms</p>
									<button className="btn btn-primary btn-sm" onClick={showSourcesForm}>Add Form</button>
								</div>
								{fbLeadforms.length > 0 ? 
									<ul className="list-group" style={{marginBottom: '0px'}}>
										{fbLeadforms.map(fbLeadform =>
											<Source
												key={fbLeadform.id}
												id={fbLeadform.id}
												// sendTest={() => sendTest(fbLeadform.id)}
												fbPageName={fbLeadform.fbPageName}
												fbFormId={fbLeadform.fbFormId}
												destinationsAmount={fbLeadform.fbLeadDestinations.length}
												handleDelete={handleDeleteFbLeadform}
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
										<p className="text-center h3" style={{margin: '0px'}}>New Form</p>
										<MdClose size="16" className={!fbLeadforms.length ? 'hide' : null} onClick={() => {
											hideSourcesForm()
											// reset()
										}} style={{cursor: 'pointer'}} />
									</div>
									<SourceCreator />
									{fbLeadforms.length == 0 ? 
										<p className="text-center"><small>But... what exactly is a <a 
											href="http://blog.installthisapp.com/creating-facebook-lead-ads/" 
											target="_blank">Facebook Leadgen Form</a>?</small></p>
									: null}
								</div>
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
												/>
											)}
										</ul></div>
									: null }
								</div>
								<div className="panel panel-default">
									<div className="panel-body">
										<div style={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'space-between',
											marginBottom: '20px',
										}}>
											<p className="text-center h3" style={{margin: '0px'}}>New Destination</p>
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