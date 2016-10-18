'use strict';
angular.module('myApp').factory('orgsEndpointsApi', function($resource) {
    return $resource('/api/scm.config/1.0/org/:orgid/endpoints', {}, 
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

angular.module('myApp').service('orgsEndpointsSelectionSvc', function() {
  this.orgsEndpoints = { };
  this.setorgsEndpoints = function(obj){ 
    this.orgsEndpoints = obj;
  }
  this.getorgsEndpoints = function(){
    return this.orgsEndpoints;
  }
});
