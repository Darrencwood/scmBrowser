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
    	},
    	'delete': {
    		method: 'DELETE',
    		url: '/api/scm.config/1.0/inbound_rule/:ruleid',
    		params: { ruleid: '@ruleid' } 
    	},
    	'update': {
    		method: 'PUT',
    		url: '/api/scm.config/1.0/inbound_rule/:ruleid',
    		params: { ruleid: '@ruleid' } 
    	}
    	
    });
});

angular.module('myApp').service('orgsInbound_rulesSelectionSvc', function() {
  this.orgsInbound_rules = { };
  this.setorgsInbound_rules = function(obj){ 
    this.orgsInbound_rules = obj;
  }
  this.getorgsInbound_rules = function(){
    return this.orgsInbound_rules;
  }
});
