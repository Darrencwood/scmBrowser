'use strict';
angular.module('myApp').factory('orgsDevicesApi', function($resource) {
    return $resource('/api/scm.config/1.0/org/:orgid/devices', {}, 
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

angular.module('myApp').service('orgsDevicesSelectionSvc', function() {
  this.orgsDevices = { };
  this.setorgsDevices = function(obj){ 
  	console.log('setting current orgsDevices to: ' + obj.id);
    this.orgsDevices = obj;
  }
  this.getorgsDevices = function(){
    return this.orgsDevices;
  }
});
