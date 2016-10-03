
'use strict';

angular.module('myApp').factory('apiCustomApps', function($resource) {
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

angular.module('myApp').service('currentCustomApps', function() {
  this.customApps = { id: ''};
  this.setCustomApps = function(id){ 
  	console.log('setting current CustomApps to: ' + id);
    this.customApps.id = id;
  }
  this.getCustomApps = function(){
    return this.customApps;
  }
});