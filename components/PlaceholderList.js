import React from 'react'

const PlaceholderList = ({ amount }) => {
	let elArr = new Array()
	for (var i = 0; i < amount; i++) {
		elArr.push(i)
	}
	return (
		<div>
			{elArr.map(i => (
				<div
					key={i}
					style={{
						display: 'flex',
						marginTop: '16px',
						marginBottom: '16px',
						flexDirection: 'row',
						alignItems: 'flex-start',
						height: '52px',
					}}>
					<div
						style={{
							borderRadius: '100px',
							height: '52px',
							width: '52px',
							background: '#eeeeee',
							marginRight: '20px',
						}}
					/>
					<div
						style={{
							borderRadius: '100px',
							flex: 1,
						}}>
						<div
							style={{
								width: '40%',
								height: '22px',
								background: '#eeeeee',
								marginBottom: '10px',
							}}
						/>
						<div
							style={{
								height: '8px',
								marginBottom: '4px',
								background: '#eeeeee',
							}}
						/>
						<div
							style={{
								height: '8px',
								background: '#eeeeee',
							}}
						/>
					</div>
				</div>
			))}
		</div>
	)
}

export default PlaceholderList
