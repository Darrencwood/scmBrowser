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
    	}
    });
});

angular.module('myApp').service('orgsDevicesSelectionSvc', function() {
  this.orgsDevices = { id: ''};
  this.setorgsDevices = function(id){ 
  	console.log('setting current orgsDevices to: ' + id);
    this.orgsDevices.id = id;
  }
  this.getorgsDevices = function(){
    return this.orgsDevices;
  }
});
