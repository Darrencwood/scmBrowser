'use strict';
angular.module('myApp').factory('orgsOutbound_rulesApi', function($resource) {
    return $resource('/api/scm.config/1.0/org/:orgid/outbound_rules', {}, 
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

angular.module('myApp').service('orgsOutbound_rulesSelectionSvc', function() {
  this.orgsOutbound_rules = { };
  this.setorgsOutbound_rules = function(obj){ 
  	console.log('setting current orgsOutbound_rules to: ' + obj.id);
    this.orgsOutbound_rules = obj;
  }
  this.getorgsOutbound_rules = function(){
    return this.orgsOutbound_rules;
  }
});
