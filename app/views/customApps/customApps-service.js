'use strict';
angular.module('myApp').factory('customAppsApi', function($resource) {
    return $resource('/api/scm.config/1.0/custom_apps', {}, 
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
    		url: '/api/scm.config/1.0/custom_app/:appid',
    		params: { appid: '@appid' } 
    	},
    	'update': {
    		method: 'PUT',
    		url: '/api/scm.config/1.0/custom_app/:appid',
    		params: { appid: '@appid' } 
    	}
    	
    });
});

angular.module('myApp').service('customAppsSelectionSvc', function() {
  this.customApps = { };
  this.setcustomApps = function(obj){ 
    this.customApps = obj;
  }
  this.getcustomApps = function(){
    return this.customApps;
  }
});
