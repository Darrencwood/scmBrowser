'use strict';
angular.module('myApp').factory('sitesApi', function($resource) {
    return $resource('/api/scm.config/1.0/orgs/sites', {}, 
    {
    	'query': {
    		method: 'GET', 
    		isArray: true , 
    		responseType: 'json',
    		transformResponse: function (data) {
     			var wrapped = angular.fromJson(data); 
     			return wrapped.items;
    		} 
    	}
    });
});

angular.module('myApp').service('sitesCurrent', function() {
  this.sites = { id: ''};
  this.setsites = function(id){ 
  	console.log('setting current sites to: ' + id);
    this.sites.id = id;
  }
  this.getsites = function(){
    return this.sites;
  }
});
