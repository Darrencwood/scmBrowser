'use strict';
angular.module('myApp').factory('pathRulesApi', function($resource) {
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

angular.module('myApp').service('pathRulesSelectionSvc', function() {
  this.pathRules = { };
  this.setpathRules = function(obj){ 
  	console.log('setting current pathRules to: ' + obj.id);
    this.pathRules = obj;
  }
  this.getpathRules = function(){
    return this.pathRules;
  }
});
