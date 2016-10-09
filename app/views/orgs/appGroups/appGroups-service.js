'use strict';
angular.module('myApp').factory('appGroupsApi', function($resource) {
    return $resource('/api/scm.config/1.0/orgs/app_groups', {}, 
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

angular.module('myApp').service('appGroupsCurrent', function() {
  this.appGroups = { id: ''};
  this.setappGroups = function(id){ 
  	console.log('setting current appGroups to: ' + id);
    this.appGroups.id = id;
  }
  this.getappGroups = function(){
    return this.appGroups;
  }
});
