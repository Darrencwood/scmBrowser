
'use strict';

angular.module('myApp').factory('apiAppGroups', function($resource) {
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
    	}
    });
});

angular.module('myApp').service('currentAppGroups', function() {
  this.appGroups = { id: ''};
  this.setAppGroups = function(id){ 
  	console.log('setting current AppGroups to: ' + id);
    this.appGroups.id = id;
  }
  this.getAppGroups = function(){
    return this.appGroups;
  }
});