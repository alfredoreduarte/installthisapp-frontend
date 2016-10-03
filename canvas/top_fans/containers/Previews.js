import React, { PropTypes } from 'react'

// Screens
import Index from 'canvas/top_fans/components/Index'

/** Photo samples. */
const entries = [{"userIdentifier":194128997290203,"userName":"CICLOVIA","likes":9,"comments":8,"score":43},{"userIdentifier":1129943930432332,"userName":"Grishel Benitez","likes":4,"comments":3,"score":32},{"userIdentifier":1237534462985484,"userName":"Rudolf Baez","likes":3,"comments":2,"score":30},{"userIdentifier":353897714942599,"userName":"Eva Sánchez","likes":3,"comments":1,"score":28},{"userIdentifier":702612416560828,"userName":"Alfredo Gomez","likes":3,"comments":1,"score":25},{"userIdentifier":1181520455255104,"userName":"Elena Segovia","likes":3,"comments":1,"score":22},{"userIdentifier":1784967545107889,"userName":"Chyn Alvarenga","likes":3,"comments":1,"score":22},{"userIdentifier":1402153219813463,"userName":"Aracelli Vega","likes":3,"comments":1,"score":22},{"userIdentifier":580998952088190,"userName":"Carteles Pintados","likes":3,"comments":1,"score":22},{"userIdentifier":553501711441175,"userName":"Fabian Cuevas","likes":3,"comments":1,"score":18}]

const Previews = ({ screen, messages }) => {
	switch (screen) {
		case 'index':
			return <Index
				title={messages.title}
				subtitle={messages.subtitle}
				likesLabel={messages.likesLabel}
				commentsLabel={messages.commentsLabel}
				pointsLabel={messages.pointsLabel}
				entries={entries}
				maxScore={entries[0].score}
			 />
		default: 
			return <div>empty</div>
	}
}

Previews.screens = [
	{ value: 'index', label: 'List'},
]

Previews.propTypes = {
	screen: PropTypes.string.isRequired,
}

export default Previews