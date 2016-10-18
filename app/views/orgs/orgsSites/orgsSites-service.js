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
    	},
    	'delete': {
    		method: 'DELETE',
    		url: '/api/scm.config/1.0/site/:siteid',
    		params: { siteid: '@siteid' } 
    	},
    	'update': {
    		method: 'PUT',
    		url: '/api/scm.config/1.0/site/:siteid',
    		params: { siteid: '@siteid' } 
    	}
    	
    });
});

angular.module('myApp').service('orgsSitesSelectionSvc', function() {
  this.orgsSites = { };
  this.setorgsSites = function(obj){ 
    this.orgsSites = obj;
  }
  this.getorgsSites = function(){
    return this.orgsSites;
  }
});
