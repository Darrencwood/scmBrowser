'use strict';
angular.module('myApp').factory('orgsInbound_rulesApi', function($resource) {
    return $resource('/api/scm.config/1.0/org/:orgid/inbound_rules', {}, 
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

angular.module('myApp').service('orgsInbound_rulesSelectionSvc', function() {
  this.orgsInbound_rules = { };
  this.setorgsInbound_rules = function(obj){ 
  	console.log('setting current orgsInbound_rules to: ' + obj.id);
    this.orgsInbound_rules = obj;
  }
  this.getorgsInbound_rules = function(){
    return this.orgsInbound_rules;
  }
});
