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
    	}
    });
});

angular.module('myApp').service('orgsSwitchesSelectionSvc', function() {
  this.orgsSwitches = { };
  this.setorgsSwitches = function(obj){ 
  	console.log('setting current orgsSwitches to: ' + obj.id);
    this.orgsSwitches = obj;
  }
  this.getorgsSwitches = function(){
    return this.orgsSwitches;
  }
});
