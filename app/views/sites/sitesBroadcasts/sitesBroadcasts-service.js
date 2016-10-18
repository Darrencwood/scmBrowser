'use strict';
angular.module('myApp').factory('sitesBroadcastsApi', function($resource) {
    return $resource('/api/scm.config/1.0/site/:siteid/broadcasts', {}, 
    {
    	'query': {
    		method: 'GET', 
    		isArray: true , 
    		responseType: 'json',
    		transformResponse: function (data) {
     			var wrapped = angular.fromJson(data); 
     			return wrapped.items;
    		}
    	},
    	'delete': {
    		method: 'DELETE',
    		url: '/api/scm.config/1.0/broadcast/:bcastid',
    		params: { bcastid: '@bcastid' } 
    	},
    	'update': {
    		method: 'PUT',
    		url: '/api/scm.config/1.0/broadcast/:bcastid',
    		params: { bcastid: '@bcastid' } 
    	}
    	
    });
});

angular.module('myApp').service('sitesBroadcastsSelectionSvc', function() {
  this.sitesBroadcasts = { };
  this.setsitesBroadcasts = function(obj){ 
    this.sitesBroadcasts = obj;
  }
  this.getsitesBroadcasts = function(){
    return this.sitesBroadcasts;
  }
});
