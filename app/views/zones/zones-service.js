'use strict';
angular.module('myApp').factory('zonesApi', function($resource) {
    return $resource('/api/scm.config/1.0/zones', {}, 
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
    		url: '/api/scm.config/1.0/zone/:zoneid',
    		params: { zoneid: '@zoneid' } 
    	},
    	'update': {
    		method: 'PUT',
    		url: '/api/scm.config/1.0/zone/:zoneid',
    		params: { zoneid: '@zoneid' } 
    	}
    	
    });
});

angular.module('myApp').service('zonesSelectionSvc', function() {
  this.zones = { };
  this.setzones = function(obj){ 
    this.zones = obj;
  }
  this.getzones = function(){
    return this.zones;
  }
});
