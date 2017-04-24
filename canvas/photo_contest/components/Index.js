import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import HeaderImage from 'canvas/photo_contest/components/HeaderImage'
import Photo from 'canvas/photo_contest/components/Photo'
import Header from 'canvas/photo_contest/components/Header'
import ToolBar from 'canvas/photo_contest/components/ToolBarIndex'
import Credits from 'canvas/photo_contest/components/Credits'

const Index = ({ 
	headerImg,
	footerImg,
	// Header
	title,
	subtitle,
	// Toolbar 
	canUpload,
	sortPhotos,
	uploadUrl,
	uploadButton,
	mostVoted,
	mostRecent,
	sort,
	search,
	searchQuery,
	// Photos
	canVote,
	votes,
	loggedUser,
	photos,
	handleVote,
	singlePhotoUrl,
}) => (
	<div>
		<div className="row">
			<HeaderImage source={headerImg} />
		</div>
		<div className="container">
			<Header title={title} subtitle={subtitle} />
			<ToolBar 
				canUpload={canUpload} 
				uploadUrl={uploadUrl} 
				uploadButton={uploadButton}
				mostRecent={mostRecent}
				mostVoted={mostVoted}
				sortPhotos={sortPhotos}
				sort={sort}
				search={search}
				searchQuery={searchQuery}
				 />
			{photos.length == 0 ?
				<div className="col-xs-12 col-sm-12 col-md-6 col-md-offset-3">
					<div style={{display: 'flex', height: '400px', justifyContent: 'center', alignItems: 'center'}}>
						{canUpload ? 
							<Link 
								to={uploadUrl} 
								style={{padding: '18px 34px', borderRadius: '3px'}} 
								className="ita-cali-button"
								data-editable-message-key="uploadButton"
								>{uploadButton}</Link>
						: null }
					</div>
				</div>
			:
				null
			}
			{photos.map( photo => 
				<div className="col-sm-4" key={photo.id}>
					<Photo 
						id={photo.id} 
						name={photo.user.name}
						votes={photo.votes.length} 
						canVote={canVote}
						voted={_.filter(votes, v => {
							return v.user.id == loggedUser.id && v.photoId == photo.id
						}).length > 0}
						singlePhotoUrl={singlePhotoUrl}
						handleVote={() => handleVote(photo.id)}
						photoUrl={photo.attachmentUrl} />
				</div>
			)}
		</div>
		<div className="row">
			<HeaderImage source={footerImg} />
		</div>
		<Credits />
	</div>
)

Index.propTypes = {
	headerImg: PropTypes.string, 
	footerImg: PropTypes.string, 
	loggedUser: PropTypes.object.isRequired, 
	votes: PropTypes.object.isRequired, 
	canVote: PropTypes.bool.isRequired,
	canUpload: PropTypes.bool.isRequired,
	photos: PropTypes.array.isRequired, 
	sort: PropTypes.string.isRequired, 
	search: PropTypes.func.isRequired, 
	searchQuery: PropTypes.string.isRequired, 
	handleVote: PropTypes.func.isRequired, 
	uploadUrl: PropTypes.string.isRequired, 
	singlePhotoUrl: PropTypes.string.isRequired,
	sortPhotos: PropTypes.func.isRequired,
}

export default Index