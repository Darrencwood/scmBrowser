'use strict';
angular.module('myApp').factory('nodesApi', function($resource) {
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

angular.module('myApp').service('nodesSelectionSvc', function() {
  this.nodes = { };
  this.setnodes = function(obj){ 
  	console.log('setting current nodes to: ' + obj.id);
    this.nodes = obj;
  }
  this.getnodes = function(){
    return this.nodes;
  }
});
