
'use strict';

angular.module('myApp').factory('apiDevices', function($resource) {
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
    	}
    });
});

angular.module('myApp').service('currentDevices', function() {
  this.devices = { id: ''};
  this.setDevices = function(id){ 
  	console.log('setting current Devices to: ' + id);
    this.devices.id = id;
  }
  this.getDevices = function(){
    return this.devices;
  }
});