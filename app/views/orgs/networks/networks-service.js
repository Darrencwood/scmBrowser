'use strict';
angular.module('myApp').factory('networksApi', function($resource) {
    return $resource('/api/scm.config/1.0/orgs/networks', {}, 
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

angular.module('myApp').service('networksCurrent', function() {
  this.networks = { id: ''};
  this.setnetworks = function(id){ 
  	console.log('setting current networks to: ' + id);
    this.networks.id = id;
  }
  this.getnetworks = function(){
    return this.networks;
  }
});
