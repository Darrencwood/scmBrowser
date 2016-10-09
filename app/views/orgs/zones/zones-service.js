'use strict';
angular.module('myApp').factory('zonesApi', function($resource) {
    return $resource('/api/scm.config/1.0/orgs/zones', {}, 
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

angular.module('myApp').service('zonesCurrent', function() {
  this.zones = { id: ''};
  this.setzones = function(id){ 
  	console.log('setting current zones to: ' + id);
    this.zones.id = id;
  }
  this.getzones = function(){
    return this.zones;
  }
});
