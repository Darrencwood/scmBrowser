'use strict';

angular.module('myApp').factory('apiClusters', function($resource) {
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

angular.module('myApp').service('currentClusters', function() {
  this.Clusters = { id: ''};
  this.setClusters = function(id){ 
  	console.log('setting current Clusters to: ' + id);
    this.Clusters.id = id;
  }
  this.getClusters = function(){
    return this.Clusters;
  }
});
