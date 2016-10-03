
'use strict';

angular.module('myApp').factory('apiOrgs', function($resource) {
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
    	'save': {
    		url: '/api/scm.config/1.0/orgs',
    		method: 'POST'
    	}
    });
});

angular.module('myApp').service('currentOrgs', function() {
  this.orgs = { id: ''};
  this.setOrgs = function(id){ 
  	console.log('setting current Orgs to: ' + id);
    this.orgs.id = id;
  }
  this.getOrgs = function(){
    return this.orgs;
  }
});