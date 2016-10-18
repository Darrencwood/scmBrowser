'use strict';
angular.module('myApp').factory('appGroupsApi', function($resource) {
    return $resource('/api/scm.config/1.0/app_groups', {}, 
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
    		url: '/api/scm.config/1.0/app_group/:appgrpid',
    		params: { appgrpid: '@appgrpid' } 
    	},
    	'update': {
    		method: 'PUT',
    		url: '/api/scm.config/1.0/app_group/:appgrpid',
    		params: { appgrpid: '@appgrpid' } 
    	}
    	
    });
});

angular.module('myApp').service('appGroupsSelectionSvc', function() {
  this.appGroups = { };
  this.setappGroups = function(obj){ 
    this.appGroups = obj;
  }
  this.getappGroups = function(){
    return this.appGroups;
  }
});
