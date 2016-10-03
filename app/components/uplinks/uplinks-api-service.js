
'use strict';

angular.module('myApp').factory('apiUplinks', function($resource) {
    return $resource('/api/scm.config/1.0/uplinks', {}, 
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

angular.module('myApp').service('currentUplinks', function() {
  this.uplinks = { id: ''};
  this.setUplinks = function(id){ 
  	console.log('setting current Uplinks to: ' + id);
    this.uplinks.id = id;
  }
  this.getUplinks = function(){
    return this.uplinks;
  }
});