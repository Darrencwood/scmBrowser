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

angular.module('myApp').service('clustersSelectionSvc', function() {
  this.clusters = { };
  this.setclusters = function(obj){ 
  	console.log('setting current clusters to: ' + obj.id);
    this.clusters = obj;
  }
  this.getclusters = function(){
    return this.clusters;
  }
});
