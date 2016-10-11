'use strict';
angular.module('myApp').factory('switchesApi', function($resource) {
    return $resource('/api/scm.config/1.0/switches', {}, 
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

angular.module('myApp').service('switchesSelectionSvc', function() {
  this.switches = { };
  this.setswitches = function(obj){ 
  	console.log('setting current switches to: ' + obj.id);
    this.switches = obj;
  }
  this.getswitches = function(){
    return this.switches;
  }
});
