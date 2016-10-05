'use strict';

angular.module('myApp').factory('apiEndpoints', function($resource) {
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

angular.module('myApp').service('currentEndpoints', function() {
  this.Endpoints = { id: ''};
  this.setEndpoints = function(id){ 
  	console.log('setting current Endpoints to: ' + id);
    this.Endpoints.id = id;
  }
  this.getEndpoints = function(){
    return this.Endpoints;
  }
});
