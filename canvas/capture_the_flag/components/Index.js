import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import FacebookProvider, { Login } from 'react-facebook'
import Credits from 'canvas/common-components/Credits'
import Image from 'canvas/common-components/Image'
import FbPhoto from 'canvas/capture_the_flag/components/FbPhoto'
import TopUsers from 'canvas/capture_the_flag/components/TopUsers'

const Index = ({ messages, images, settings, entries, currentWinner, timer, captchaPath, claim, isPreview, logged, isItMe }) => (
	<div>
		<Image source={images.header} />
		<TopUsers entries={entries} flagLabel={messages.flagLabel} />
		<div className="container">
			<div className="col-xs-12">
				<div className="text-center">
					<div id="timer">{timer}</div>
				</div>
				{currentWinner ? (
					<div>
						<h1 id="main-screen-title">{messages.mainScreenTitle}</h1>
						<p className="text-center">
							<FbPhoto identifier={currentWinner.user.identifier} className="current-winner-pic" />
						</p>
						<h3 className="current-winner-name">{currentWinner.user.name}</h3>
					</div>
				) : (
					<div>
						<h1 id="main-screen-title">{messages.nobodyHasPrize}</h1>
					</div>
				)}
				{timer != '00:00:00' && (
					<p className="text-center">
						{!isPreview &&
							!isItMe &&
							!logged && (
								<FacebookProvider appId={window.facebookAppId}>
									<Login
										scope="email"
										onResponse={claim}
										onError={e => {}}
										render={({ isLoading, isWorking, onClick }) => (
											<button
												disabled={isLoading || isWorking}
												className="btn btn-primary btn-lg"
												id="claim-button"
												onClick={onClick}>
												{isLoading || isWorking ? '...' : messages.claimButtonLabel}
											</button>
										)}
									/>
								</FacebookProvider>
							)}
						{!isPreview &&
							logged &&
							!isItMe && (
								<Link to={captchaPath} className="btn btn-primary btn-lg" id="claim-button">
									{messages.claimButtonLabel}
								</Link>
							)}
						{isPreview && (
							<button className="btn btn-primary btn-lg" id="claim-button">
								{messages.claimButtonLabel}
							</button>
						)}
					</p>
				)}
			</div>
		</div>
		<Image source={images.footer} />
		<Credits />
	</div>
)

Index.propTypes = {}

export default Index
