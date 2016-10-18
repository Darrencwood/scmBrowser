'use strict';
angular.module('myApp').factory('orgsUsersApi', function($resource) {
    return $resource('/api/scm.config/1.0/org/:orgid/users', {}, 
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
    		url: '/api/scm.config/1.0/user/:userid',
    		params: { userid: '@userid' } 
    	},
    	'update': {
    		method: 'PUT',
    		url: '/api/scm.config/1.0/user/:userid',
    		params: { userid: '@userid' } 
    	}
    	
    });
});

angular.module('myApp').service('orgsUsersSelectionSvc', function() {
  this.orgsUsers = { };
  this.setorgsUsers = function(obj){ 
    this.orgsUsers = obj;
  }
  this.getorgsUsers = function(){
    return this.orgsUsers;
  }
});
