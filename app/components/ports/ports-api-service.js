'use strict';

angular.module('myApp').factory('apiPorts', function($resource) {
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

angular.module('myApp').service('currentPorts', function() {
  this.Ports = { id: ''};
  this.setPorts = function(id){ 
  	console.log('setting current Ports to: ' + id);
    this.Ports.id = id;
  }
  this.getPorts = function(){
    return this.Ports;
  }
});
