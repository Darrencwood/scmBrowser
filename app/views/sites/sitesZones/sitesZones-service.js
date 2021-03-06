'use strict';
angular.module('myApp').factory('sitesZonesApi', function($resource) {
    return $resource('/api/scm.config/1.0/site/:siteid/zones', {}, 
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

angular.module('myApp').service('sitesZonesSelectionSvc', function() {
  this.sitesZones = { };
  this.setsitesZones = function(obj){ 
    this.sitesZones = obj;
  }
  this.getsitesZones = function(){
    return this.sitesZones;
  }
});
