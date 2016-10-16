'use strict';
angular.module('myApp').factory('uplinksApi', function($resource) {
    return $resource('/api/scm.config/1.0/uplinks', {}, 
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
    		url: '/api/scm.config/1.0/uplink/:uplinkid',
    		params: { uplinkid: '@uplinkid' } 
    	},
    	'update': {
    		method: 'PUT',
    		url: '/api/scm.config/1.0/uplink/:uplinkid',
    		params: { uplinkid: '@uplinkid' } 
    	}
    	
    });
});

angular.module('myApp').service('uplinksSelectionSvc', function() {
  this.uplinks = { };
  this.setuplinks = function(obj){ 
  	console.log('setting current uplinks to: ' + obj.id);
    this.uplinks = obj;
  }
  this.getuplinks = function(){
    return this.uplinks;
  }
});
