'use strict';
angular.module('myApp').factory('switchesApi', function($resource) {
    return $resource('/api/scm.config/1.0/orgs/switches', {}, 
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

angular.module('myApp').service('switchesCurrent', function() {
  this.switches = { id: ''};
  this.setswitches = function(id){ 
  	console.log('setting current switches to: ' + id);
    this.switches.id = id;
  }
  this.getswitches = function(){
    return this.switches;
  }
});
