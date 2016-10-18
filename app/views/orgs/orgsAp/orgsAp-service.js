'use strict';
angular.module('myApp').factory('orgsApApi', function($resource) {
    return $resource('/api/scm.config/1.0/org/:orgid/ap', {}, 
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
    		url: '/api/scm.config/1.0/ap/:apid',
    		params: { apid: '@apid' } 
    	},
    	'update': {
    		method: 'PUT',
    		url: '/api/scm.config/1.0/ap/:apid',
    		params: { apid: '@apid' } 
    	}
    	
    });
});

angular.module('myApp').service('orgsApSelectionSvc', function() {
  this.orgsAp = { };
  this.setorgsAp = function(obj){ 
    this.orgsAp = obj;
  }
  this.getorgsAp = function(){
    return this.orgsAp;
  }
});
