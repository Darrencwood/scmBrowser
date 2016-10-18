'use strict';
angular.module('myApp').factory('dcuplinksApi', function($resource) {
    return $resource('/api/scm.config/1.0/dcuplinks', {}, 
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
    		url: '/api/scm.config/1.0/dcuplink/:dcuplinkid',
    		params: { dcuplinkid: '@dcuplinkid' } 
    	},
    	'update': {
    		method: 'PUT',
    		url: '/api/scm.config/1.0/dcuplink/:dcuplinkid',
    		params: { dcuplinkid: '@dcuplinkid' } 
    	}
    	
    });
});

angular.module('myApp').service('dcuplinksSelectionSvc', function() {
  this.dcuplinks = { };
  this.setdcuplinks = function(obj){ 
    this.dcuplinks = obj;
  }
  this.getdcuplinks = function(){
    return this.dcuplinks;
  }
});
