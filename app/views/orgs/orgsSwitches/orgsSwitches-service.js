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
  this.orgsSwitches = { id: ''};
  this.setorgsSwitches = function(id){ 
  	console.log('setting current orgsSwitches to: ' + id);
    this.orgsSwitches.id = id;
  }
  this.getorgsSwitches = function(){
    return this.orgsSwitches;
  }
});
