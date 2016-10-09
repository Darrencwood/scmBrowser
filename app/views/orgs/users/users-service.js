'use strict';
angular.module('myApp').factory('usersApi', function($resource) {
    return $resource('/api/scm.config/1.0/orgs/users', {}, 
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

angular.module('myApp').service('usersCurrent', function() {
  this.users = { id: ''};
  this.setusers = function(id){ 
  	console.log('setting current users to: ' + id);
    this.users.id = id;
  }
  this.getusers = function(){
    return this.users;
  }
});
