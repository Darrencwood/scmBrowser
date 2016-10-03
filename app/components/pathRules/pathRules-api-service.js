
'use strict';

angular.module('myApp').factory('apiPathRules', function($resource) {
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

angular.module('myApp').service('currentPathRules', function() {
  this.pathRules = { id: ''};
  this.setPathRules = function(id){ 
  	console.log('setting current PathRules to: ' + id);
    this.pathRules.id = id;
  }
  this.getPathRules = function(){
    return this.pathRules;
  }
});