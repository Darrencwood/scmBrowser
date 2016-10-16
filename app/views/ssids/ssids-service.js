'use strict';
angular.module('myApp').factory('ssidsApi', function($resource) {
    return $resource('/api/scm.config/1.0/ssids', {}, 
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
    		url: '/api/scm.config/1.0/ssid/:ssidid',
    		params: { ssidid: '@ssidid' } 
    	},
    	'update': {
    		method: 'PUT',
    		url: '/api/scm.config/1.0/ssid/:ssidid',
    		params: { ssidid: '@ssidid' } 
    	}
    	
    });
});

angular.module('myApp').service('ssidsSelectionSvc', function() {
  this.ssids = { };
  this.setssids = function(obj){ 
  	console.log('setting current ssids to: ' + obj.id);
    this.ssids = obj;
  }
  this.getssids = function(){
    return this.ssids;
  }
});
