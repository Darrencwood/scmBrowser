'use strict';

angular.module('myApp').factory('apiInboundRules', function($resource) {
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

angular.module('myApp').service('currentInboundRules', function() {
  this.inboundRules = { id: ''};
  this.setInboundRules = function(id){ 
  	console.log('setting current InboundRules to: ' + id);
    this.inboundRules.id = id;
  }
  this.getInboundRules = function(){
    return this.inboundRules;
  }
});

