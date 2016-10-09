'use strict';
angular.module('myApp').factory('appsApi', function($resource) {
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

angular.module('myApp').service('appsCurrent', function() {
  this.apps = { id: ''};
  this.setapps = function(id){ 
  	console.log('setting current apps to: ' + id);
    this.apps.id = id;
  }
  this.getapps = function(){
    return this.apps;
  }
});
