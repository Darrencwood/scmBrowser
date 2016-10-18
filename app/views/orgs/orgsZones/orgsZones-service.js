'use strict';
angular.module('myApp').factory('orgsZonesApi', function($resource) {
    return $resource('/api/scm.config/1.0/org/:orgid/zones', {}, 
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

angular.module('myApp').service('orgsZonesSelectionSvc', function() {
  this.orgsZones = { };
  this.setorgsZones = function(obj){ 
    this.orgsZones = obj;
  }
  this.getorgsZones = function(){
    return this.orgsZones;
  }
});
