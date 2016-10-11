'use strict';
angular.module('myApp').factory('inboundRulesApi', function($resource) {
    return $resource('/api/scm.config/1.0/inbound_rules', {}, 
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

angular.module('myApp').service('inboundRulesSelectionSvc', function() {
  this.inboundRules = { };
  this.setinboundRules = function(obj){ 
  	console.log('setting current inboundRules to: ' + obj.id);
    this.inboundRules = obj;
  }
  this.getinboundRules = function(){
    return this.inboundRules;
  }
});
