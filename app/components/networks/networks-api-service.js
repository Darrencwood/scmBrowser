
'use strict';

angular.module('myApp').factory('apiNetworks', function($resource) {
    return $resource('/api/scm.config/1.0/networks', {}, 
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

angular.module('myApp').service('currentNetworks', function() {
  this.networks = { id: ''};
  this.setNetworks = function(id){ 
  	console.log('setting current Networks to: ' + id);
    this.networks.id = id;
  }
  this.getNetworks = function(){
    return this.networks;
  }
});