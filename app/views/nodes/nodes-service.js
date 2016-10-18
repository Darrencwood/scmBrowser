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
    	},
    	'delete': {
    		method: 'DELETE',
    		url: '/api/scm.config/1.0/node/:nodeid',
    		params: { nodeid: '@nodeid' } 
    	},
    	'update': {
    		method: 'PUT',
    		url: '/api/scm.config/1.0/node/:nodeid',
    		params: { nodeid: '@nodeid' } 
    	}
    	
    });
});

angular.module('myApp').service('nodesSelectionSvc', function() {
  this.nodes = { };
  this.setnodes = function(obj){ 
    this.nodes = obj;
  }
  this.getnodes = function(){
    return this.nodes;
  }
});
