import React, { PropTypes } from 'react'

// Screens
import Intro from 'canvas/photo_contest/components/Intro'
import Index from 'canvas/photo_contest/components/Index'
import Upload from 'canvas/photo_contest/components/Upload'
import Single from 'canvas/photo_contest/components/SingleView'

/** Photo samples. */
const demoPhotos = [
	'https://instagram.fasu1-1.fna.fbcdn.net/t51.2885-15/e35/14359508_382034698587220_570290345_n.jpg?ig_cache_key=MTMzODgxOTAwMzA4NjQxNDUyMA%3D%3D.2',
	'https://instagram.fasu1-1.fna.fbcdn.net/t51.2885-15/e35/14310668_143890829397534_559443428_n.jpg?ig_cache_key=MTMzODgxOTEwMzIyMjA5NjI0MA%3D%3D.2',
	'https://instagram.fasu1-1.fna.fbcdn.net/t51.2885-15/e35/14369187_308331302856891_707169755_n.jpg?ig_cache_key=MTMzODgxOTA3MDUyMjQ2MzQxNg%3D%3D.2',
	'https://instagram.fasu1-1.fna.fbcdn.net/t51.2885-15/e35/14276660_1728878054031003_778093012_n.jpg?ig_cache_key=MTMzODgxODkxMTk0NTA4MDcxMg%3D%3D.2',
	'https://instagram.fasu1-1.fna.fbcdn.net/t51.2885-15/e35/14368985_1084357931646303_1740833135_n.jpg?ig_cache_key=MTMzODgxODgwMDUxODY4NTQ1NQ%3D%3D.2',
	'https://instagram.fasu1-1.fna.fbcdn.net/t51.2885-15/e35/14368985_1084357931646303_1740833135_n.jpg?ig_cache_key=MTMzODgxODgwMDUxODY4NTQ1NQ%3D%3D.2',
	'https://instagram.fasu1-1.fna.fbcdn.net/t51.2885-15/e35/14240824_1315374595159496_1092450378_n.jpg?ig_cache_key=MTMzODgxODg3NzM4MzE1NzA3Ng%3D%3D.2',
]

const demoNames = [
	'Adam Murphy',
	'Cheryl Jones',
	'Billy Garrett',
	'Megan Little',
	'Catherine Little',
	'Virginia Simpson',
	'Frances Woods',
]

/** Throws back a Photo object with a different id and url each time. */
class photoSequencer {
	constructor(elements = demoPhotos) {
		this._elements = elements
		this._index = 0
	}
	getOne() {
		let element
		if (!(this._index < this._elements.length)) {
			this._index = 0
		}
		element = singlePhoto(this._index, this._elements[this._index], demoNames[this._index])
		this._index = this._index + 1
		return element
	}
}

/** Photo element base to be returned by the sequencer. */
const singlePhoto = (id, url, name) => ({
	id: id,
	user: {
		name: name,
	},
	votes: [
		{
			id: id * 100,
			photoId: id,
			user: {
				id: 1,
				name: "Alfredo Re",
				firstName: "Alfredo",
				lastName: "Re",
				identifier: "10210089963347759",
				email: "alfredoreduarte@gmail.com",
			}
		}
	],
	caption: 'Ligula Justo Vehicula Cras',
	voted: true,
	attachmentUrl: url,
	handleVote: () => console.log('vote'),
	singlePhotoUrl: '',
})

const votes = {
	'4': {
		id: 4,
		createdAt: '2017-03-08T01:51:45.343Z',
		photoId: 2,
		user: {
			id: 1,
			name: 'Alfredo Re',
			firstName: 'Alfredo',
			lastName: 'Re',
			identifier: '10210089963347759',
			email: 'alfredoreduarte@gmail.com',
			tokenForBusiness: 'AbzlzZ44-kPe8F7n',
			createdAt: '2017-03-08T00:20:54.611Z',
			updatedAt: '2017-03-08T00:20:54.923Z'
		}
	},
	'5': {
		id: 5,
		createdAt: '2017-03-08T01:55:39.918Z',
		photoId: 12,
		user: {
			id: 1,
			name: 'Alfredo Re',
			firstName: 'Alfredo',
			lastName: 'Re',
			identifier: '10210089963347759',
			email: 'alfredoreduarte@gmail.com',
			tokenForBusiness: 'AbzlzZ44-kPe8F7n',
			createdAt: '2017-03-08T00:20:54.611Z',
			updatedAt: '2017-03-08T00:20:54.923Z'
		}
	}
}

const sequencer = new photoSequencer()

const Previews = ({ screen, messages, images }) => {
	switch (screen) {
		case 'intro':
			return <Intro
				intro={images.intro}
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