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
    	}
    });
});

angular.module('myApp').service('orgsZonesSelectionSvc', function() {
  this.orgsZones = { id: ''};
  this.setorgsZones = function(id){ 
  	console.log('setting current orgsZones to: ' + id);
    this.orgsZones.id = id;
  }
  this.getorgsZones = function(){
    return this.orgsZones;
  }
});
