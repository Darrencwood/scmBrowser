'use strict';
angular.module('myApp').factory('bgpneighsApi', function($resource) {
    return $resource('/api/scm.config/1.0/bgpneighs', {}, 
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

angular.module('myApp').service('bgpneighsSelectionSvc', function() {
  this.bgpneighs = { };
  this.setbgpneighs = function(obj){ 
    this.bgpneighs = obj;
  }
  this.getbgpneighs = function(){
    return this.bgpneighs;
  }
});
