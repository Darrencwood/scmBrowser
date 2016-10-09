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
    	}
    });
});

angular.module('myApp').service('nodesPortsSelectionSvc', function() {
  this.nodesPorts = { id: ''};
  this.setnodesPorts = function(id){ 
  	console.log('setting current nodesPorts to: ' + id);
    this.nodesPorts.id = id;
  }
  this.getnodesPorts = function(){
    return this.nodesPorts;
  }
});
