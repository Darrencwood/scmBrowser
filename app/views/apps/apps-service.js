'use strict';
angular.module('myApp').factory('appsApi', function($resource) {
    return $resource('/api/scm.config/1.0/apps', {}, 
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
    		url: '/api/scm.config/1.0/app/:appid',
    		params: { appid: '@appid' } 
    	},
    	'update': {
    		method: 'PUT',
    		url: '/api/scm.config/1.0/app/:appid',
    		params: { appid: '@appid' } 
    	}
    	
    });
});

angular.module('myApp').service('appsSelectionSvc', function() {
  this.apps = { };
  this.setapps = function(obj){ 
    this.apps = obj;
  }
  this.getapps = function(){
    return this.apps;
  }
});
