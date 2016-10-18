'use strict';
angular.module('myApp').factory('endpointsApi', function($resource) {
    return $resource('/api/scm.config/1.0/endpoints', {}, 
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
    		url: '/api/scm.config/1.0/endpoint/:epid',
    		params: { epid: '@epid' } 
    	},
    	'update': {
    		method: 'PUT',
    		url: '/api/scm.config/1.0/endpoint/:epid',
    		params: { epid: '@epid' } 
    	}
    	
    });
});

angular.module('myApp').service('endpointsSelectionSvc', function() {
  this.endpoints = { };
  this.setendpoints = function(obj){ 
    this.endpoints = obj;
  }
  this.getendpoints = function(){
    return this.endpoints;
  }
});
