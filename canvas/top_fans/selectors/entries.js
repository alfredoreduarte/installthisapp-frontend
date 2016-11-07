import _ from 'lodash'
import { createSelector } from 'reselect'

// 
// Merges two collections based on a common key
// 
const merge = (a, b, key) => {

    function x(a) {
        a.forEach(function (b) {
            if (!(b[key] in obj)) {
                obj[b[key]] = obj[b[key]] || {};
                array.push(obj[b[key]]);
            }
            Object.keys(b).forEach(function (k) {
                obj[b[key]][k] = b[k];
            });
        });
    }

    var array = [],
        obj = {};

    x(a);
    x(b);
    return array;
}

// export const getEntries = state => state.entries
export const getEntries = state => {
	if (state.entries.likes || state.entries.comments) {
		const arrResult = merge(state.entries.likes, state.entries.comments, 'senderId')
		return _.take(arrResult, 10)
	}
	else{
		return []
	}
}
// export const getLikesForPage = state => state.topFans.likes
// export const getLikesForPage = state => {
// 	console.log('state que tengo')
// 	console.log(state)
// 	return state.topFans.likes[Object.keys(state.topFans.likes)[0]]
// }