'use strict';
angular.module('myApp').factory('customAppsApi', function($resource) {
    return $resource('/api/scm.config/1.0/custom_apps', {}, 
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

angular.module('myApp').service('customAppsCurrent', function() {
  this.customApps = { id: ''};
  this.setcustomApps = function(id){ 
  	console.log('setting current customApps to: ' + id);
    this.customApps.id = id;
  }
  this.getcustomApps = function(){
    return this.customApps;
  }
});
