import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import FacebookLogin from 'react-facebook-login'
import { push } from 'react-router-redux'
import { setNewAppPage } from 'actions/newApp'
import { fetchFacebookPages } from 'actions/pages'
import { getAllPages } from 'selectors/pages'
import FbPhoto from 'components/FbPhoto'
import { fbLogin } from 'lib/facebook'

const PageGrid = ({ loading, pages, handlePageSelection, handlePermissionRequest }) => (
	<div>
		{pages.length > 0 ? (
			<p className="text-center">
				{loading ? (
					<button className="btn btn-default btn-sm" disabled>
						Getting Facebook pages...
					</button>
				) : (
					<FacebookLogin
						appId={window.facebookAppId}
						cssClass="btn btn-default btn-sm"
						scope="manage_pages"
						autoLoad={false}
						textButton="Refresh page list"
						callback={response => handlePermissionRequest()}
					/>
				)}
			</p>
		) : null}
		<div className="container-flex">
			{pages.length > 0 ? (
				pages.map(page => (
					<div className="col-flex col-flex-basis-4" key={page.id}>
						<div className="media ita-page media-stacked text-center" onClick={() => handlePageSelection(page.id)}>
							<div className="media-left media-middle">
								<a href="javascript:void(0);">
									<FbPhoto
										width="100px"
										identifier={page.identifier}
										className="media-object img-rounded img-responsive"
									/>
								</a>
							</div>
							<div className="media-body media-middle">
								<a href="javascript:void(0);">
									<h6 className="media-heading text-relevant-title weight-normal font-size-large">{page.name}</h6>
								</a>
								<p className="hide">
									<small>{page.fanCount} Likes</small>
								</p>
							</div>
						</div>
					</div>
				))
			) : (
				<div className="text-center">
					<p>Seems like we still don't know your Facebook Pages</p>
					{loading ? (
						<button className="btn btn-default btn-sm" disabled>
							Getting Facebook pages...
						</button>
					) : (
						<FacebookLogin
							appId={window.facebookAppId}
							cssClass="btn btn-primary btn-lg"
							scope="manage_pages"
							autoLoad={false}
							textButton="Get Facebook Pages"
							callback={response => handlePermissionRequest()}
						/>
					)}
				</div>
			)}
		</div>
	</div>
)

const mapStateToProps = state => ({
	pages: getAllPages(state),
	loading: state.activityIndicators.loadingPages,
})

const mapDispatchToProps = dispatch => ({
	handlePageSelection: id => {
		dispatch(setNewAppPage(id))
		dispatch(push('/d/apps/create/3'))
	},
	handlePermissionRequest: () => dispatch(fetchFacebookPages()),
})

export default connect(mapStateToProps, mapDispatchToProps)(PageGrid)
