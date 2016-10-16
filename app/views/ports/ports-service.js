'use strict';
angular.module('myApp').factory('portsApi', function($resource) {
    return $resource('/api/scm.config/1.0/ports', {}, 
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

angular.module('myApp').service('portsSelectionSvc', function() {
  this.ports = { };
  this.setports = function(obj){ 
  	console.log('setting current ports to: ' + obj.id);
    this.ports = obj;
  }
  this.getports = function(){
    return this.ports;
  }
});
