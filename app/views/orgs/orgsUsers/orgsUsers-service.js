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
  this.orgsUsers = { };
  this.setorgsUsers = function(obj){ 
  	console.log('setting current orgsUsers to: ' + obj.id);
    this.orgsUsers = obj;
  }
  this.getorgsUsers = function(){
    return this.orgsUsers;
  }
});
