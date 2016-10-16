'use strict';
angular.module('myApp').factory('orgsSsidsApi', function($resource) {
    return $resource('/api/scm.config/1.0/org/:orgid/ssids', {}, 
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

angular.module('myApp').service('orgsSsidsSelectionSvc', function() {
  this.orgsSsids = { };
  this.setorgsSsids = function(obj){ 
  	console.log('setting current orgsSsids to: ' + obj.id);
    this.orgsSsids = obj;
  }
  this.getorgsSsids = function(){
    return this.orgsSsids;
  }
});
