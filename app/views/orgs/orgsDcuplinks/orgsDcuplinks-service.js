'use strict';
angular.module('myApp').factory('orgsDcuplinksApi', function($resource) {
    return $resource('/api/scm.config/1.0/org/:orgid/dcuplinks', {}, 
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

angular.module('myApp').service('orgsDcuplinksSelectionSvc', function() {
  this.orgsDcuplinks = { };
  this.setorgsDcuplinks = function(obj){ 
  	console.log('setting current orgsDcuplinks to: ' + obj.id);
    this.orgsDcuplinks = obj;
  }
  this.getorgsDcuplinks = function(){
    return this.orgsDcuplinks;
  }
});
