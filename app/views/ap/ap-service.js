'use strict';
angular.module('myApp').factory('apApi', function($resource) {
    return $resource('/api/scm.config/1.0/ap', {}, 
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

angular.module('myApp').service('apSelectionSvc', function() {
  this.ap = { };
  this.setap = function(obj){ 
  	console.log('setting current ap to: ' + obj.id);
    this.ap = obj;
  }
  this.getap = function(){
    return this.ap;
  }
});
