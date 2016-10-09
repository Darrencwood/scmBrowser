'use strict';
angular.module('myApp').factory('nodesApi', function($resource) {
    return $resource('/api/scm.config/1.0/sites/nodes', {}, 
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

angular.module('myApp').service('nodesCurrent', function() {
  this.nodes = { id: ''};
  this.setnodes = function(id){ 
  	console.log('setting current nodes to: ' + id);
    this.nodes.id = id;
  }
  this.getnodes = function(){
    return this.nodes;
  }
});
