'use strict';

angular.module('myApp').factory('apiWans', function($resource) {
    return $resource('/api/scm.config/1.0/wans', {}, 
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

angular.module('myApp').service('currentWans', function() {
  this.Wans = { id: ''};
  this.setWans = function(id){ 
  	console.log('setting current Wans to: ' + id);
    this.Wans.id = id;
  }
  this.getWans = function(){
    return this.Wans;
  }
});
