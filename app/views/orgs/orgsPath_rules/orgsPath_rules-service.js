'use strict';
angular.module('myApp').factory('orgsPath_rulesApi', function($resource) {
    return $resource('/api/scm.config/1.0/org/:orgid/path_rules', {}, 
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

angular.module('myApp').service('orgsPath_rulesSelectionSvc', function() {
  this.orgsPath_rules = { };
  this.setorgsPath_rules = function(obj){ 
  	console.log('setting current orgsPath_rules to: ' + obj.id);
    this.orgsPath_rules = obj;
  }
  this.getorgsPath_rules = function(){
    return this.orgsPath_rules;
  }
});
