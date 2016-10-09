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
    	}
    });
});

angular.module('myApp').service('orgsClustersSelectionSvc', function() {
  this.orgsClusters = { id: ''};
  this.setorgsClusters = function(id){ 
  	console.log('setting current orgsClusters to: ' + id);
    this.orgsClusters.id = id;
  }
  this.getorgsClusters = function(){
    return this.orgsClusters;
  }
});
