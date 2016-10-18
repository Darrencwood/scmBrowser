'use strict';
angular.module('myApp').factory('sitesApi', function($resource) {
    return $resource('/api/scm.config/1.0/sites', {}, 
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

angular.module('myApp').service('sitesSelectionSvc', function() {
  this.sites = { };
  this.setsites = function(obj){ 
    this.sites = obj;
  }
  this.getsites = function(){
    return this.sites;
  }
});
