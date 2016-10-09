'use strict';
angular.module('myApp').factory('uplinksApi', function($resource) {
    return $resource('/api/scm.config/1.0/orgs/uplinks', {}, 
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

angular.module('myApp').service('uplinksCurrent', function() {
  this.uplinks = { id: ''};
  this.setuplinks = function(id){ 
  	console.log('setting current uplinks to: ' + id);
    this.uplinks.id = id;
  }
  this.getuplinks = function(){
    return this.uplinks;
  }
});
