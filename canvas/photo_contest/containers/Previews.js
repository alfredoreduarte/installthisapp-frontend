import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import defaultImages from 'lib/defaultImages'

// Screens
import PhotosList from 'canvas/photo_contest/components/PhotosList'
import Upload from 'canvas/photo_contest/components/Upload'
import Single from 'canvas/photo_contest/components/Single'

const photos = [
	{
		id: 1,
		user: {
			name: 'Alfredo Re',
		},
		votes: [
			{
				id: 1,
				photoId: 1,
				user: {
					id: 1,
					name: 'Alfredo Re',
					firstName: 'Alfredo',
					lastName: 'Re',
					identifier: '10210089963347759',
					email: 'alfredoreduarte@gmail.com',
				},
			},
		],
		caption: 'Ligula Justo Vehicula Cras',
		voted: true,
		attachmentUrl:
			'https://instagram.fasu1-1.fna.fbcdn.net/t51.2885-15/e35/14359508_382034698587220_570290345_n.jpg?ig_cache_key=MTMzODgxOTAwMzA4NjQxNDUyMA%3D%3D.2',
		// handleVote: () => {},
		singlePhotoUrl: '',
	},
	{
		id: 2,
		user: {
			name: 'Alfredo Re',
		},
		votes: [
			{
				id: 1,
				photoId: 2,
				user: {
					id: 1,
					name: 'Alfredo Re',
					firstName: 'Alfredo',
					lastName: 'Re',
					identifier: '10210089963347759',
					email: 'alfredoreduarte@gmail.com',
				},
			},
		],
		caption: 'Ligula Justo Vehicula Cras',
		voted: true,
		attachmentUrl:
			'https://instagram.fasu1-1.fna.fbcdn.net/t51.2885-15/e35/14359508_382034698587220_570290345_n.jpg?ig_cache_key=MTMzODgxOTAwMzA4NjQxNDUyMA%3D%3D.2',
		// handleVote: () => {},
		singlePhotoUrl: '',
	},
]

const Previews = ({ screen, messages, images, settings, emptyFunc }) => {
	switch (screen) {
		case 'photosList':
			return (
				<PhotosList
					messages={messages}
					images={images}
					settings={settings}
					isPreview={true}
					photos={photos}
					handleLogin={emptyFunc}
					getMore={emptyFunc}
				/>
			)
		case 'upload':
			return (
				<Upload
					messages={messages}
					images={images}
					settings={settings}
					formValues={{ caption: null, attachmentUrl: null }}
					isPreview={true}
				/>
			)
		case 'single':
			return (
				<Single
					messages={messages}
					images={images}
					settings={settings}
					isPreview={true}
					photo={photos[0]}
					handleVote={emptyFunc}
				/>
			)
		default:
			return <div>empty</div>
	}
}

const mapStateToProps = (state, props) => {
	return {
		screen: state.formEditorUI.editorScreens[state.formEditorUI.screen].value,
		messages: state.form.formEditor.values.messages,
		images: {
			...state.form.formEditor.values.images,
			welcome: state.form.formEditor.values.images.welcome || defaultImages.welcome,
			header: state.form.formEditor.values.images.header || defaultImages.header,
		},
		settings: state.form.formEditor.values.settings,
	}
}

const mapDispatchToProps = dispatch => ({
	emptyFunc: () => {},
})

Previews.propTypes = {
	screen: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Previews)
