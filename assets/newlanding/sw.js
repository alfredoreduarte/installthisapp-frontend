/*
*
*  Push Notifications codelab
*  Copyright 2015 Google Inc. All rights reserved.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      https://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License
*
*/

// Version 0.1

'use strict'

// TODO
var config = {
  version: 'pushidoo',
}
var BaseUrl = 'https://clients.pushido.com'
var defaultIcon = '/images/92_default.png'
var splitEndPointSubscription = function(subscriptionDetails) {
  var endpointURL = 'https://android.googleapis.com/gcm/send/',
    // endpointURLFirefox = 'https://updates.push.services.mozilla.com/push/v1/',
    endpointURLFirefox = 'https://updates.push.services.mozilla.com/wpush/v1/',
    endpoint = subscriptionDetails.endpoint,
    subscriptionId
  console.log(subscriptionDetails.endpoint)
  if (endpoint.indexOf(endpointURL) === 0) {
    return (subscriptionId = endpoint.replace(endpointURL, ''))
  } else if (endpoint.indexOf(endpointURLFirefox) === 0) {
    return (subscriptionId = endpoint.replace(endpointURLFirefox, ''))
  }

  return subscriptionDetails.subscriptionId
}

console.log('Started', self)
self.addEventListener('install', function(event) {
  self.skipWaiting()
  // function onInstall (event, opts) {
  //   var cacheKey = cacheName('static', opts);
  //   return caches.open(cacheKey)
  //     .then(cache => cache.addAll(opts.staticCacheItems));
  // }

  // event.waitUntil(
  //   onInstall(event, config).then( () => self.skipWaiting() )
  // );
})
self.addEventListener('message', function(evt) {
  console.log('postMessage received', evt.data)
  console.log('reg manager', self.registration.pushManager)
  self.registration.pushManager.getSubscription().then(function(subscription) {
    if (subscription) {
      console.log(subscription.endpoint)
      var url = evt.data.url
      var app_token = evt.data.app_token
      var segments = evt.data.segments
      var timezone = evt.data.timezone
      console.log('subscription')
      var extUrl = BaseUrl + '/sw/h.php'
      // var token = splitEndPointSubscription(subscription);
      var token = subscription
      var cleanUrl =
        extUrl + '?token=' + token + '&app_token=' + app_token + '&segment=' + segments + '&timezone=' + timezone + '&url=' + url
      console.log(cleanUrl)
      fetch(cleanUrl).catch(function(err) {
        console.log(err)
      })
    } else {
      console.log('not subscription')
    }
  })
})

self.addEventListener('activate', function(event) {
  console.log('Activated', event)
  event.waitUntil(self.clients.claim())
})
self.addEventListener('pushsubscriptionchange', function() {
  // do something, usually resubscribe to push and
  // send the new subscription details back to the
  // server via XHR or Fetch
})
self.addEventListener('push', function(event) {
  console.log('Push message received', event)
  // TODO
  // console.log(event);
  event.waitUntil(
    self.registration.pushManager.getSubscription().then(function(subscription) {
      if (subscription) {
        // var ptoken = splitEndPointSubscription(subscription);
        var ptoken = subscription.endpoint
        var pextUrl = BaseUrl + '/sw/push_details.php?token=' + ptoken
        console.log(pextUrl)
        var purl = pextUrl
        // event.waitUntil(
        return fetch(purl)
          .then(function(response) {
            console.log('fetch')
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' + response.status)
              throw new Error()
            }
            console.log(response)
            return response.json().then(function(data) {
              console.log(data)
              //   if (data.error || !data.notification) {
              //     console.error('The API returned an error.', data.error);
              //     throw new Error();
              //   }

              var title = data.notification.title
              var message = data.notification.message
              var icon = data.notification.icon
              var notificationTag = data.notification.url
              var url = data.notification.url

              // if (message == "null") {

              // }else{
              return self.registration.showNotification(title, {
                body: message,
                icon: icon,
                tag: notificationTag,
              })
              // }
            })
          })
          .catch(function(err) {
            console.error('Unable to retrieve data', err)
            var title = 'An error occurred'
            var message = 'We were unable to get the information for this push message'
            var icon = 'https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-128.png'
            var notificationTag = 'notification-error'
            return self.registration.showNotification(title, {
              body: message,
              icon: icon,
              tag: notificationTag,
            })
          })
        // );
      }
    })
  )
})

self.addEventListener('notificationclick', function(event) {
  console.log('On notification click: ', event.notification)
  // Android doesn't close the notification when you click on it
  // See: http://crbug.com/463146
  event.notification.close()
  console.log(event.notification)

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(
    clients
      .matchAll({
        type: 'window',
      })
      .then(function(clientList) {
        console.log(clientList)
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i]
          if (client.url == '/' && 'focus' in client) return client.focus()
        }
        if (clients.openWindow) {
          console.log('openWindow')
          return clients.openWindow(BaseUrl + '/sw/r.php?tag=' + event.notification.tag)
        }
      })
  )
})
