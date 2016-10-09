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
    	}
    });
});

angular.module('myApp').service('clustersCurrent', function() {
  this.clusters = { id: ''};
  this.setclusters = function(id){ 
  	console.log('setting current clusters to: ' + id);
    this.clusters.id = id;
  }
  this.getclusters = function(){
    return this.clusters;
  }
});
