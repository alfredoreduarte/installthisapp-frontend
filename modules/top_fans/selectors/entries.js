import _ from 'lodash'
import { createSelector } from 'reselect'
import { getCurrentApp } from 'selectors/apps'
import { getAllPages } from 'selectors/pages'

const getAllEntries = state => state.topFans.entries

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

export const getEntriesForPage = createSelector(
	getAllEntries,
	getCurrentApp,
	getAllPages,
	(entries, app, allPages) => {
		if (app && app.page) {
			const page = _.find(allPages, {'id': app.page})
			const identifier = parseInt(page.identifier)
			if (entries[identifier]){
				const selectedEntries = entries[identifier]
				const arrResult = merge(selectedEntries.likes, selectedEntries.comments, 'senderId')
				return arrResult
			}
			else{
				return []
			}
		}
		else{
			return []
		}
	}
)