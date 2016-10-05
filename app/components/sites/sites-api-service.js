'use strict';

angular.module('myApp').factory('apiSites', function($resource) {
    return $resource('/api/scm.config/1.0/sites', {}, 
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

angular.module('myApp').service('currentSites', function() {
  this.Sites = { id: ''};
  this.setSites = function(id){ 
  	console.log('setting current Sites to: ' + id);
    this.Sites.id = id;
  }
  this.getSites = function(){
    return this.Sites;
  }
});
