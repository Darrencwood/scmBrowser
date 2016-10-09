'use strict';
angular.module('myApp').factory('orgsEndpointsApi', function($resource) {
    return $resource('/api/scm.config/1.0/org/:orgid/endpoints', {}, 
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

angular.module('myApp').service('orgsEndpointsSelectionSvc', function() {
  this.orgsEndpoints = { id: ''};
  this.setorgsEndpoints = function(id){ 
  	console.log('setting current orgsEndpoints to: ' + id);
    this.orgsEndpoints.id = id;
  }
  this.getorgsEndpoints = function(){
    return this.orgsEndpoints;
  }
});
