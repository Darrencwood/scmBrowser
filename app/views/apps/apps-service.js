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

angular.module('myApp').service('appsSelectionSvc', function() {
  this.apps = { };
  this.setapps = function(obj){ 
  	console.log('setting current apps to: ' + obj.id);
    this.apps = obj;
  }
  this.getapps = function(){
    return this.apps;
  }
});
