export const fbLogin = callback => {
	FB.login(function(response){
		if (response.status === 'connected') {
			console.log('FB Connected');
		} else if (response.status === 'not_authorized') {
			console.log('not authorized');
		} else {
			
		}
		callback(response.status);
	}, {
		scope: 'manage_pages'
	})
}