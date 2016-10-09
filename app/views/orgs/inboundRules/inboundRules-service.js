'use strict';
angular.module('myApp').factory('inboundRulesApi', function($resource) {
    return $resource('/api/scm.config/1.0/orgs/inbound_rules', {}, 
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

angular.module('myApp').service('inboundRulesCurrent', function() {
  this.inboundRules = { id: ''};
  this.setinboundRules = function(id){ 
  	console.log('setting current inboundRules to: ' + id);
    this.inboundRules.id = id;
  }
  this.getinboundRules = function(){
    return this.inboundRules;
  }
});
