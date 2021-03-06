'use strict';
angular.module('myApp').factory('orgsBroadcastsApi', function($resource) {
    return $resource('/api/scm.config/1.0/org/:orgid/broadcasts', {}, 
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

angular.module('myApp').service('orgsBroadcastsSelectionSvc', function() {
  this.orgsBroadcasts = { };
  this.setorgsBroadcasts = function(obj){ 
    this.orgsBroadcasts = obj;
  }
  this.getorgsBroadcasts = function(){
    return this.orgsBroadcasts;
  }
});
