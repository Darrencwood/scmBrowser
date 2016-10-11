'use strict';
angular.module('myApp').factory('outboundRulesApi', function($resource) {
    return $resource('/api/scm.config/1.0/outbound_rules', {}, 
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

angular.module('myApp').service('outboundRulesSelectionSvc', function() {
  this.outboundRules = { };
  this.setoutboundRules = function(obj){ 
  	console.log('setting current outboundRules to: ' + obj.id);
    this.outboundRules = obj;
  }
  this.getoutboundRules = function(){
    return this.outboundRules;
  }
});
