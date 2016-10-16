'use strict';
angular.module('myApp').factory('orgsUplinksApi', function($resource) {
    return $resource('/api/scm.config/1.0/org/:orgid/uplinks', {}, 
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

angular.module('myApp').service('orgsUplinksSelectionSvc', function() {
  this.orgsUplinks = { };
  this.setorgsUplinks = function(obj){ 
  	console.log('setting current orgsUplinks to: ' + obj.id);
    this.orgsUplinks = obj;
  }
  this.getorgsUplinks = function(){
    return this.orgsUplinks;
  }
});
