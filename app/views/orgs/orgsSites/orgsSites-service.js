'use strict';
angular.module('myApp').factory('orgsSitesApi', function($resource) {
    return $resource('/api/scm.config/1.0/org/:orgid/sites', {}, 
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

angular.module('myApp').service('orgsSitesSelectionSvc', function() {
  this.orgsSites = { };
  this.setorgsSites = function(obj){ 
  	console.log('setting current orgsSites to: ' + obj.id);
    this.orgsSites = obj;
  }
  this.getorgsSites = function(){
    return this.orgsSites;
  }
});
