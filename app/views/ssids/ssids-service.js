'use strict';
angular.module('myApp').factory('ssidsApi', function($resource) {
    return $resource('/api/scm.config/1.0/ssids', {}, 
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

angular.module('myApp').service('ssidsSelectionSvc', function() {
  this.ssids = { id: ''};
  this.setssids = function(id){ 
  	console.log('setting current ssids to: ' + id);
    this.ssids.id = id;
  }
  this.getssids = function(){
    return this.ssids;
  }
});
