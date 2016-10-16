'use strict';
angular.module('myApp').factory('orgsApp_groupsApi', function($resource) {
    return $resource('/api/scm.config/1.0/org/:orgid/app_groups', {}, 
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

angular.module('myApp').service('orgsApp_groupsSelectionSvc', function() {
  this.orgsApp_groups = { };
  this.setorgsApp_groups = function(obj){ 
  	console.log('setting current orgsApp_groups to: ' + obj.id);
    this.orgsApp_groups = obj;
  }
  this.getorgsApp_groups = function(){
    return this.orgsApp_groups;
  }
});
