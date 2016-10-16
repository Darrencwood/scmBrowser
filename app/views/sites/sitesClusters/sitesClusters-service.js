'use strict';
angular.module('myApp').factory('sitesClustersApi', function($resource) {
    return $resource('/api/scm.config/1.0/site/:siteid/clusters', {}, 
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

angular.module('myApp').service('sitesClustersSelectionSvc', function() {
  this.sitesClusters = { };
  this.setsitesClusters = function(obj){ 
  	console.log('setting current sitesClusters to: ' + obj.id);
    this.sitesClusters = obj;
  }
  this.getsitesClusters = function(){
    return this.sitesClusters;
  }
});
