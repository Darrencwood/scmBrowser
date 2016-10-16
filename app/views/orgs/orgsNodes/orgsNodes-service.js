'use strict';
angular.module('myApp').factory('orgsNodesApi', function($resource) {
    return $resource('/api/scm.config/1.0/org/:orgid/nodes', {}, 
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

angular.module('myApp').service('orgsNodesSelectionSvc', function() {
  this.orgsNodes = { };
  this.setorgsNodes = function(obj){ 
  	console.log('setting current orgsNodes to: ' + obj.id);
    this.orgsNodes = obj;
  }
  this.getorgsNodes = function(){
    return this.orgsNodes;
  }
});
