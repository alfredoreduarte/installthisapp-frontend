import 'isomorphic-fetch'
import { API_URL } from 'config'
const topFansTest = (index = 0) => {
	if (index >= postsArray.length) {return true}
	console.log('Index ', index)
	fetch(`${API_URL}/subscription`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: postsArray[index]
	})
	.then(response => response.text())
	.then(text =>{
		// console.log(text)
		// fakePost(index + 1)
	})
	// if (index < 3) {
		topFansTest(index + 1)
	// }
}

export default topFansTest

const postsArray = [
	'{"entry":[{"id":"272699880986","time":1462890284,"changes":[{"value":{"post_id":"272699880986_10202683965162433","parent_id":"272699880986_10202683965162433","sender_name":"Alfredo Re","created_time":1462890284,"sender_id":10206266332119368,"verb":"add","item":"like"},"field":"feed"}]}]}',
	'{"entry":[{"id":"272699880986","time":1462890284,"changes":[{"value":{"post_id":"272699880986_10154133134845987","parent_id":"272699880986_10154133134845987","sender_name":"Martín Acuña Lledó","created_time":1462890284,"sender_id":574373700,"verb":"add","item":"like"},"field":"feed"}]}]}',
	'{"entry":[{"id":"272699880986","time":1462890284,"changes":[{"value":{"post_id":"272699880986_10154133134845987","parent_id":"272699880986_10154133134845987","sender_name":"Alfredo Re","created_time":1462890284,"sender_id":10206266332119368,"verb":"add","item":"like"},"field":"feed"}]}]}',
]