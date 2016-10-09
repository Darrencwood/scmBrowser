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
  this.orgsPath_rules = { id: ''};
  this.setorgsPath_rules = function(id){ 
  	console.log('setting current orgsPath_rules to: ' + id);
    this.orgsPath_rules.id = id;
  }
  this.getorgsPath_rules = function(){
    return this.orgsPath_rules;
  }
});
