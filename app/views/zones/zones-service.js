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
    	}
    });
});

angular.module('myApp').service('zonesSelectionSvc', function() {
  this.zones = { };
  this.setzones = function(obj){ 
  	console.log('setting current zones to: ' + obj.id);
    this.zones = obj;
  }
  this.getzones = function(){
    return this.zones;
  }
});
