'use strict';
angular.module('myApp').factory('clustersApi', function($resource) {
    return $resource('/api/scm.config/1.0/clusters', {}, 
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
    		url: '/api/scm.config/1.0/cluster/:clusterid',
    		params: { clusterid: '@clusterid' } 
    	},
    	'update': {
    		method: 'PUT',
    		url: '/api/scm.config/1.0/cluster/:clusterid',
    		params: { clusterid: '@clusterid' } 
    	}
    	
    });
});

angular.module('myApp').service('clustersSelectionSvc', function() {
  this.clusters = { };
  this.setclusters = function(obj){ 
    this.clusters = obj;
  }
  this.getclusters = function(){
    return this.clusters;
  }
});
