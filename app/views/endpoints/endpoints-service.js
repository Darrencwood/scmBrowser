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
    	}
    });
});

angular.module('myApp').service('endpointsSelectionSvc', function() {
  this.endpoints = { };
  this.setendpoints = function(obj){ 
  	console.log('setting current endpoints to: ' + obj.id);
    this.endpoints = obj;
  }
  this.getendpoints = function(){
    return this.endpoints;
  }
});
