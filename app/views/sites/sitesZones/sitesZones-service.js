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
  this.sitesZones = { id: ''};
  this.setsitesZones = function(id){ 
  	console.log('setting current sitesZones to: ' + id);
    this.sitesZones.id = id;
  }
  this.getsitesZones = function(){
    return this.sitesZones;
  }
});
