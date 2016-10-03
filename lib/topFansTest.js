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
	'{"object":"page","entry":[{"id":"272699880986","time":1462890284,"changes":[{"value":{"post_id":"272699880986_10202683965162433","parent_id":"272699880986_10202683965162433","sender_name":"Alfredo Re","created_time":1462890284,"sender_id":10206266332119368,"verb":"add","item":"like"},"field":"feed"}]}]}',
	'{"object":"page","entry":[{"id":"272699880986","time":1462890284,"changes":[{"value":{"post_id":"272699880986_10154133134845987","parent_id":"272699880986_10154133134845987","sender_name":"Martín Acuña Lledó","created_time":1462890284,"sender_id":574373700,"verb":"add","item":"like"},"field":"feed"}]}]}',
	'{"object":"page","entry":[{"id":"272699880986","time":1462890284,"changes":[{"value":{"post_id":"272699880986_10154133134845987","parent_id":"272699880986_10154133134845987","sender_name":"Alfredo Re","created_time":1462890284,"sender_id":10206266332119368,"verb":"add","item":"like"},"field":"feed"}]}]}',
	'{"object":"page","entry":[{"id":"162583067088337","time":1462890284,"changes":[{"value":{"post_id":"162583067088337_1232301086783191","comment_id":"1232301086783191_1233380880008545","message":"\u4e5f\u6709\u7537\u751f\u6709","parent_id":"162583067088337_1232301086783191","sender_name":"\u9ec3\u5eb8\u5eb8","created_time":1462890283,"sender_id":1103060969736454,"verb":"add","item":"comment"},"field":"feed"}]}]}',
	'{"object":"page","entry":[{"id":"1121052477911802","time":1462890286,"changes":[{"value":{"post_id":"1121052477911802_1309576622392719","comment_id":"1309576622392719_1309724359044612","message":"How much po ito?? and full specs?? ilang inches and dual sim po ba??","parent_id":"1121052477911802_1309576622392719","sender_name":"Cristina Teobengco","created_time":1462890286,"sender_id":1729012207337405,"verb":"add","item":"comment"},"field":"feed"}]}]}',
]