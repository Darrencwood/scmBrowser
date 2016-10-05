'use strict';

angular.module('myApp').factory('apiCustomapps', function($resource) {
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

angular.module('myApp').service('currentCustomapps', function() {
  this.Customapps = { id: ''};
  this.setCustomapps = function(id){ 
  	console.log('setting current Customapps to: ' + id);
    this.Customapps.id = id;
  }
  this.getCustomapps = function(){
    return this.Customapps;
  }
});
