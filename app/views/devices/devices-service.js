'use strict';
angular.module('myApp').factory('devicesApi', function($resource) {
    return $resource('/api/scm.config/1.0/devices', {}, 
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
    		url: '/api/scm.config/1.0/device/:devid',
    		params: { devid: '@devid' } 
    	},
    	'update': {
    		method: 'PUT',
    		url: '/api/scm.config/1.0/device/:devid',
    		params: { devid: '@devid' } 
    	}
    	
    });
});

angular.module('myApp').service('devicesSelectionSvc', function() {
  this.devices = { };
  this.setdevices = function(obj){ 
    this.devices = obj;
  }
  this.getdevices = function(){
    return this.devices;
  }
});
