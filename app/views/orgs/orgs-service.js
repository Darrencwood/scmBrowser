'use strict';
angular.module('myApp').factory('orgsApi', function($resource) {
    return $resource('/api/scm.config/1.0/orgs', {}, 
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
    		url: '/api/scm.config/1.0/org/:orgid',
    		params: { orgid: '@orgid' } 
    	},
    	'update': {
    		method: 'PUT',
    		url: '/api/scm.config/1.0/org/:orgid',
    		params: { orgid: '@orgid' } 
    	}
    	
    });
});

angular.module('myApp').service('orgsSelectionSvc', function() {
  this.orgs = { };
  this.setorgs = function(obj){ 
  	console.log('setting current orgs to: ' + obj.id);
    this.orgs = obj;
  }
  this.getorgs = function(){
    return this.orgs;
  }
});
