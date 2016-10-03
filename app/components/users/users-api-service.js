
'use strict';

angular.module('myApp').factory('apiUsers', function($resource) {
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
    	}
    });
});

angular.module('myApp').service('currentUsers', function() {
  this.users = { id: ''};
  this.setUsers = function(id){ 
  	console.log('setting current Users to: ' + id);
    this.users.id = id;
  }
  this.getUsers = function(){
    return this.users;
  }
});