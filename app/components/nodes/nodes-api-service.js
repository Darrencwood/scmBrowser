'use strict';

angular.module('myApp').factory('apiNodes', function($resource) {
    return $resource('/api/scm.config/1.0/nodes', {}, 
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

angular.module('myApp').service('currentNodes', function() {
  this.Nodes = { id: ''};
  this.setNodes = function(id){ 
  	console.log('setting current Nodes to: ' + id);
    this.Nodes.id = id;
  }
  this.getNodes = function(){
    return this.Nodes;
  }
});
