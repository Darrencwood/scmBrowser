'use strict';

angular.module('myApp').factory('apiZones', function($resource) {
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
    	}
    });
});

angular.module('myApp').service('currentZones', function() {
  this.Zones = { id: ''};
  this.setZones = function(id){ 
  	console.log('setting current Zones to: ' + id);
    this.Zones.id = id;
  }
  this.getZones = function(){
    return this.Zones;
  }
});
