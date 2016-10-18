'use strict';
angular.module('myApp').factory('usersApi', function($resource) {
    return $resource('/api/scm.config/1.0/users', {}, 
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

angular.module('myApp').service('usersSelectionSvc', function() {
  this.users = { };
  this.setusers = function(obj){ 
    this.users = obj;
  }
  this.getusers = function(){
    return this.users;
  }
});
