'use strict';
angular.module('myApp').factory('orgsClustersApi', function($resource) {
    return $resource('/api/scm.config/1.0/org/:orgid/clusters', {}, 
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

angular.module('myApp').service('orgsClustersSelectionSvc', function() {
  this.orgsClusters = { };
  this.setorgsClusters = function(obj){ 
    this.orgsClusters = obj;
  }
  this.getorgsClusters = function(){
    return this.orgsClusters;
  }
});
