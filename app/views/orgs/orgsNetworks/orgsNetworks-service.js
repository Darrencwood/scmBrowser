'use strict';
angular.module('myApp').factory('orgsNetworksApi', function($resource) {
    return $resource('/api/scm.config/1.0/org/:orgid/networks', {}, 
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
    		url: '/api/scm.config/1.0/network/:netid',
    		params: { netid: '@netid' } 
    	},
    	'update': {
    		method: 'PUT',
    		url: '/api/scm.config/1.0/network/:netid',
    		params: { netid: '@netid' } 
    	}
    	
    });
});

angular.module('myApp').service('orgsNetworksSelectionSvc', function() {
  this.orgsNetworks = { };
  this.setorgsNetworks = function(obj){ 
    this.orgsNetworks = obj;
  }
  this.getorgsNetworks = function(){
    return this.orgsNetworks;
  }
});
