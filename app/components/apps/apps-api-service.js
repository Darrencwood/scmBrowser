'use strict';

angular.module('myApp').factory('apiApps', function($resource) {
    return $resource('/api/scm.config/1.0/apps', {}, 
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

angular.module('myApp').service('currentApps', function() {
  this.Apps = { id: ''};
  this.setApps = function(id){ 
  	console.log('setting current Apps to: ' + id);
    this.Apps.id = id;
  }
  this.getApps = function(){
    return this.Apps;
  }
});
