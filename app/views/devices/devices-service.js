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
    	}
    });
});

angular.module('myApp').service('devicesCurrent', function() {
  this.devices = { id: ''};
  this.setdevices = function(id){ 
  	console.log('setting current devices to: ' + id);
    this.devices.id = id;
  }
  this.getdevices = function(){
    return this.devices;
  }
});
