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
    	}
    });
});

angular.module('myApp').service('portsSelectionSvc', function() {
  this.ports = { id: ''};
  this.setports = function(id){ 
  	console.log('setting current ports to: ' + id);
    this.ports.id = id;
  }
  this.getports = function(){
    return this.ports;
  }
});
