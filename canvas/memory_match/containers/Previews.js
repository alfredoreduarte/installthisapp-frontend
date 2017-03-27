import React, { PropTypes } from 'react'

// Screens
import Intro from 'canvas/memory_match/components/Intro'
import Index from 'canvas/memory_match/components/Index'

/** Photo samples. */
const demoPhotos = [
	'https://instagram.fasu1-1.fna.fbcdn.net/t51.2885-15/e35/14359508_382034698587220_570290345_n.jpg?ig_cache_key=MTMzODgxOTAwMzA4NjQxNDUyMA%3D%3D.2',
]

const Previews = ({ screen, messages, images }) => {
	switch (screen) {
		case 'intro':
			return <Intro
				image={images.intro}
				linkUrl={'#'}
			 />
		case 'index':
			return <Index
				headerImg={images.header}
				footerImg={images.footer}
				title={messages.title}
				subtitle={messages.subtitle}
				canUpload={true}
				canVote={true}
				loggedUser={{id: 1}}
				uploadButton={messages.uploadButton}
				mostVoted={messages.mostVoted}
				mostRecent={messages.mostRecent}
				photos={[0,1,2,3,4,5,6].map(el => {const elOne = sequencer.getOne();console.log(elOne);return elOne;})}
				votes={votes}
				handleVote={() => console.log('vote')}
				uploadUrl={' '}
				singlePhotoUrl={''}
				sortPhotos={() => console.log('sort')}
				sort={'mostVoted'}
				search={() => console.log('search')}
				searchQuery={''}
			 />
		case 'upload':
			return <Upload
				headerImg={images.header}
				footerImg={images.footer}
				title={messages.title}
				subtitle={messages.subtitle}
				userName="Alfredo Re"
				userIdentifier="10210089963347759"
				submitButton={messages.submitButton}
				photoFormLabel={messages.photoFormLabel}
				captionFormLabel={messages.captionFormLabel}
				back={messages.back}
				uploadPhoto={() => console.log('vote')}
				busy={false}
				backUrl={' '}
			 />
		case 'single':
			return <Single
				headerImg={images.header}
				footerImg={images.footer}
				title={messages.title}
				subtitle={messages.subtitle}
				uploadButton={messages.uploadButton}
				mostVoted={messages.mostVoted}
				mostRecent={messages.mostRecent}
				photo={sequencer.getOne()}
				voted={true}
				canUpload={true}
				canVote={true}
				back={messages.back}
				handleVote={() => console.log('vote')}
				uploadUrl={''}
				backUrl={' '}
			 />
		default: 
			return <div>empty</div>
	}
}

Previews.screens = [
	{ value: 'intro', label: 'Introduction'},
	{ value: 'index', label: 'Photos'},
	{ value: 'upload', label: 'Upload Form'},
	{ value: 'single', label: 'Individual Photo'},
]

Previews.propTypes = {
	screen: PropTypes.string.isRequired,
}

export default Previews