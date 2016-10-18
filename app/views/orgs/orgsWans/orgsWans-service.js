'use strict';
angular.module('myApp').factory('orgsWansApi', function($resource) {
    return $resource('/api/scm.config/1.0/org/:orgid/wans', {}, 
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
    		url: '/api/scm.config/1.0/wan/:wanid',
    		params: { wanid: '@wanid' } 
    	},
    	'update': {
    		method: 'PUT',
    		url: '/api/scm.config/1.0/wan/:wanid',
    		params: { wanid: '@wanid' } 
    	}
    	
    });
});

angular.module('myApp').service('orgsWansSelectionSvc', function() {
  this.orgsWans = { };
  this.setorgsWans = function(obj){ 
    this.orgsWans = obj;
  }
  this.getorgsWans = function(){
    return this.orgsWans;
  }
});
