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
    	}
    });
});

angular.module('myApp').service('orgsUsersSelectionSvc', function() {
  this.orgsUsers = { id: ''};
  this.setorgsUsers = function(id){ 
  	console.log('setting current orgsUsers to: ' + id);
    this.orgsUsers.id = id;
  }
  this.getorgsUsers = function(){
    return this.orgsUsers;
  }
});
