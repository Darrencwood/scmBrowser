'use strict';
angular.module('myApp').factory('networksApi', function($resource) {
    return $resource('/api/scm.config/1.0/networks', {}, 
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
    		url: '/api/scm.config/1.0/network/:netid',
    		params: { netid: '@netid' } 
    	},
    	'update': {
    		method: 'PUT',
    		url: '/api/scm.config/1.0/network/:netid',
    		params: { netid: '@netid' } 
    	}
    	
    });
});

angular.module('myApp').service('networksSelectionSvc', function() {
  this.networks = { };
  this.setnetworks = function(obj){ 
    this.networks = obj;
  }
  this.getnetworks = function(){
    return this.networks;
  }
});
