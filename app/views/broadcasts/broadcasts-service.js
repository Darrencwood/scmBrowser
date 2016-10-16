'use strict';
angular.module('myApp').factory('broadcastsApi', function($resource) {
    return $resource('/api/scm.config/1.0/broadcasts', {}, 
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

angular.module('myApp').service('broadcastsSelectionSvc', function() {
  this.broadcasts = { };
  this.setbroadcasts = function(obj){ 
  	console.log('setting current broadcasts to: ' + obj.id);
    this.broadcasts = obj;
  }
  this.getbroadcasts = function(){
    return this.broadcasts;
  }
});
