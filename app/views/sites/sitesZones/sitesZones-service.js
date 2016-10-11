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
    	}
    });
});

angular.module('myApp').service('sitesZonesSelectionSvc', function() {
  this.sitesZones = { };
  this.setsitesZones = function(obj){ 
  	console.log('setting current sitesZones to: ' + obj.id);
    this.sitesZones = obj;
  }
  this.getsitesZones = function(){
    return this.sitesZones;
  }
});
