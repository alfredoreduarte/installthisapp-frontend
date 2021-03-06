import React, { PropTypes } from 'react'

// Screens
import Index from 'canvas/top_fans/components/Index'
import Intro from 'canvas/top_fans/components/Intro'

/** Sample data. */
const entries = [{"senderId":194128997290203,"senderName":"CICLOVIA","likes":9,"comments":8,"score":43},{"senderId":1129943930432332,"senderName":"Grishel Benitez","likes":4,"comments":3,"score":32},{"senderId":1237534462985484,"senderName":"Rudolf Baez","likes":3,"comments":2,"score":30},{"senderId":353897714942599,"senderName":"Eva Sánchez","likes":3,"comments":1,"score":28},{"senderId":702612416560828,"senderName":"Alfredo Gomez","likes":3,"comments":1,"score":25},{"senderId":1181520455255104,"senderName":"Elena Segovia","likes":3,"comments":1,"score":22},{"senderId":1784967545107889,"senderName":"Chyn Alvarenga","likes":3,"comments":1,"score":22},{"senderId":1402153219813463,"senderName":"Aracelli Vega","likes":3,"comments":1,"score":22},{"senderId":580998952088190,"senderName":"Carteles Pintados","likes":3,"comments":1,"score":22},{"senderId":553501711441175,"senderName":"Fabian Cuevas","likes":3,"comments":1,"score":18}]

const Previews = ({ screen, messages, images }) => {
	switch (screen) {
		case 'intro':
			return <Intro
				intro={images.intro}
			 />
		case 'index':
			return <Index
				header={images.header}
				footer={images.footer}
				title={messages.title}
				subtitle={messages.subtitle}
				likesLabel={messages.likesLabel}
				commentsLabel={messages.commentsLabel}
				pointsLabel={messages.pointsLabel}
				entries={entries}
				maxScore={entries[0].score}
				currentUserScore={null}
				currentUserName={null}
				currentUserIdentifier={null}
				getSingleUserScores={() => {}}
				signInLabel={messages.signInLabel}
				anonUserLoginPrompt={messages.anonUserLoginPrompt}
				loggedUserScoreLabel={messages.loggedUserScoreLabel}
				updateLabel={messages.updateLabel}
			 />
		case 'logged':
			return <Index
				header={images.header}
				footer={images.footer}
				title={messages.title}
				subtitle={messages.subtitle}
				likesLabel={messages.likesLabel}
				commentsLabel={messages.commentsLabel}
				pointsLabel={messages.pointsLabel}
				entries={entries}
				maxScore={entries[0].score}
				currentUserScore={261}
				currentUserName={`Rick Sanchez`}
				currentUserIdentifier={"Rick.Sanchez.of.Earth.Dimension.C137"}
				getSingleUserScores={() => {}}
				signInLabel={messages.signInLabel}
				anonUserLoginPrompt={messages.anonUserLoginPrompt}
				loggedUserScoreLabel={messages.loggedUserScoreLabel}
				updateLabel={messages.updateLabel}
			 />
		default: 
			return <div>empty</div>
	}
}

Previews.screens = [
	{ value: 'intro', label: 'Intro'},
	{ value: 'index', label: 'List'},
	{ value: 'logged', label: "Logged User's score"},
]

Previews.propTypes = {
	screen: PropTypes.string.isRequired,
}

export default Previews