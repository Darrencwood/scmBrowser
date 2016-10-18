'use strict';
angular.module('myApp').factory('orgsSwitchesApi', function($resource) {
    return $resource('/api/scm.config/1.0/org/:orgid/switches', {}, 
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
    		url: '/api/scm.config/1.0/switch/:switchid',
    		params: { switchid: '@switchid' } 
    	},
    	'update': {
    		method: 'PUT',
    		url: '/api/scm.config/1.0/switch/:switchid',
    		params: { switchid: '@switchid' } 
    	}
    	
    });
});

angular.module('myApp').service('orgsSwitchesSelectionSvc', function() {
  this.orgsSwitches = { };
  this.setorgsSwitches = function(obj){ 
    this.orgsSwitches = obj;
  }
  this.getorgsSwitches = function(){
    return this.orgsSwitches;
  }
});
