'use strict';
angular.module('myApp').factory('orgsDcinterfacesApi', function($resource) {
    return $resource('/api/scm.config/1.0/org/:orgid/dcinterfaces', {}, 
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
    		url: '/api/scm.config/1.0/dcinterfaces/:dcinterfaceid',
    		params: { dcinterfaceid: '@dcinterfaceid' } 
    	},
    	'update': {
    		method: 'PUT',
    		url: '/api/scm.config/1.0/dcinterfaces/:dcinterfaceid',
    		params: { dcinterfaceid: '@dcinterfaceid' } 
    	}
    	
    });
});

angular.module('myApp').service('orgsDcinterfacesSelectionSvc', function() {
  this.orgsDcinterfaces = { };
  this.setorgsDcinterfaces = function(obj){ 
    this.orgsDcinterfaces = obj;
  }
  this.getorgsDcinterfaces = function(){
    return this.orgsDcinterfaces;
  }
});
