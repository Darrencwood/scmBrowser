'use strict';

angular.module('myApp').factory('apiSwitches', function($resource) {
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

angular.module('myApp').service('currentSwitches', function() {
  this.Switches = { id: ''};
  this.setSwitches = function(id){ 
  	console.log('setting current Switches to: ' + id);
    this.Switches.id = id;
  }
  this.getSwitches = function(){
    return this.Switches;
  }
});
