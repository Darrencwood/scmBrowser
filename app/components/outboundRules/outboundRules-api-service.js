
'use strict';

angular.module('myApp').factory('apiOutboundRules', function($resource) {
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

angular.module('myApp').service('currentOutboundRules', function() {
  this.outboundRules = { id: ''};
  this.setOutboundRules = function(id){ 
  	console.log('setting current OutboundRules to: ' + id);
    this.outboundRules.id = id;
  }
  this.getOutboundRules = function(){
    return this.outboundRules;
  }
});