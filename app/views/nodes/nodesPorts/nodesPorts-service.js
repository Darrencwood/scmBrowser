'use strict';
angular.module('myApp').factory('nodesPortsApi', function($resource) {
    return $resource('/api/scm.config/1.0/node/:nodeid/ports', {}, 
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
    		url: '/api/scm.config/1.0/port/:portid',
    		params: { portid: '@portid' } 
    	},
    	'update': {
    		method: 'PUT',
    		url: '/api/scm.config/1.0/port/:portid',
    		params: { portid: '@portid' } 
    	}
    	
    });
});

angular.module('myApp').service('nodesPortsSelectionSvc', function() {
  this.nodesPorts = { };
  this.setnodesPorts = function(obj){ 
    this.nodesPorts = obj;
  }
  this.getnodesPorts = function(){
    return this.nodesPorts;
  }
});
