'use strict';

angular.module('myApp').factory('apiAppgroups', function($resource) {
    return $resource('/api/scm.config/1.0/app_groups', {}, 
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

angular.module('myApp').service('currentAppgroups', function() {
  this.Appgroups = { id: ''};
  this.setAppgroups = function(id){ 
  	console.log('setting current Appgroups to: ' + id);
    this.Appgroups.id = id;
  }
  this.getAppgroups = function(){
    return this.Appgroups;
  }
});
