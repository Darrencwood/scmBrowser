'use strict';

angular.module('myApp').factory('apiPathrules', function($resource) {
    return $resource('/api/scm.config/1.0/path_rules', {}, 
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

angular.module('myApp').service('currentPathrules', function() {
  this.Pathrules = { id: ''};
  this.setPathrules = function(id){ 
  	console.log('setting current Pathrules to: ' + id);
    this.Pathrules.id = id;
  }
  this.getPathrules = function(){
    return this.Pathrules;
  }
});
