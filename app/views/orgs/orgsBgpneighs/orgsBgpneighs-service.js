'use strict';
angular.module('myApp').factory('orgsBgpneighsApi', function($resource) {
    return $resource('/api/scm.config/1.0/org/:orgid/bgpneighs', {}, 
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
    		url: '/api/scm.config/1.0/bgpneighs/:bgpneighid',
    		params: { bgpneighid: '@bgpneighid' } 
    	},
    	'update': {
    		method: 'PUT',
    		url: '/api/scm.config/1.0/bgpneighs/:bgpneighid',
    		params: { bgpneighid: '@bgpneighid' } 
    	}
    	
    });
});

angular.module('myApp').service('orgsBgpneighsSelectionSvc', function() {
  this.orgsBgpneighs = { };
  this.setorgsBgpneighs = function(obj){ 
    this.orgsBgpneighs = obj;
  }
  this.getorgsBgpneighs = function(){
    return this.orgsBgpneighs;
  }
});
