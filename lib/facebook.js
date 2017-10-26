export const fbLogin = callback => {
  FB.login(
    function(response) {
      if (response.status === 'connected') {
        console.log('FB Connected')
      } else if (response.status === 'not_authorized') {
        console.log('not authorized')
      } else {
      }
      callback(response)
    },
    {
      scope: 'manage_pages',
      return_scopes: true,
    }
  )
}
