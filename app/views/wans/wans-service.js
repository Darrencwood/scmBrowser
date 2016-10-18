'use strict';
angular.module('myApp').factory('wansApi', function($resource) {
    return $resource('/api/scm.config/1.0/wans', {}, 
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
    		url: '/api/scm.config/1.0/wan/:wanid',
    		params: { wanid: '@wanid' } 
    	},
    	'update': {
    		method: 'PUT',
    		url: '/api/scm.config/1.0/wan/:wanid',
    		params: { wanid: '@wanid' } 
    	}
    	
    });
});

angular.module('myApp').service('wansSelectionSvc', function() {
  this.wans = { };
  this.setwans = function(obj){ 
    this.wans = obj;
  }
  this.getwans = function(){
    return this.wans;
  }
});
