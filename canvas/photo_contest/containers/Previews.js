import React, { PropTypes } from 'react'

// Screens
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
			id: id,
		}
	],
	caption: 'Caption',
	voted: true,
	thumbnailUrl: url,
	assetUrl: url,
	handleVote: () => console.log('vote'),
	singlePhotoUrl: '',
})

const sequencer = new photoSequencer()

const Previews = ({ screen, messages }) => {
	switch (screen) {
		case 'index':
			return <Index
				title={messages.title}
				subtitle={messages.subtitle}
				uploadButton={messages.uploadButton}
				mostVoted={messages.mostVoted}
				mostRecent={messages.mostRecent}
				photos={[0,1,2,3,4,5,6].map(el => sequencer.getOne())}
				handleVote={() => console.log('vote')}
				uploadUrl={' '}
				singlePhotoUrl={''}
			 />
		case 'upload':
			return <Upload
				title={messages.title}
				subtitle={messages.subtitle}
				uploadButton={messages.uploadButton}
				mostVoted={messages.mostVoted}
				mostRecent={messages.mostRecent}
				uploadPhoto={() => console.log('vote')}
				backUrl={' '}
			 />
		case 'single':
			return <Single
				title={messages.title}
				subtitle={messages.subtitle}
				uploadButton={messages.uploadButton}
				mostVoted={messages.mostVoted}
				mostRecent={messages.mostRecent}
				photo={sequencer.getOne()}
				voted={true}
				handleVote={() => console.log('vote')}
				uploadUrl={''}
				backUrl={' '}
			 />
		default: 
			return <div>empty</div>
	}
}

Previews.screens = [
	{ value: 'index', label: 'List'},
	{ value: 'upload', label: 'Upload Photo'},
	{ value: 'single', label: 'Individual Photo'},
]

Previews.propTypes = {
	screen: PropTypes.string.isRequired,
}

export default Previews