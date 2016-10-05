'use strict';

angular.module('myApp').factory('apiAp', function($resource) {
    return $resource('/api/scm.config/1.0/ap', {}, 
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

angular.module('myApp').service('currentAp', function() {
  this.Ap = { id: ''};
  this.setAp = function(id){ 
  	console.log('setting current Ap to: ' + id);
    this.Ap.id = id;
  }
  this.getAp = function(){
    return this.Ap;
  }
});
