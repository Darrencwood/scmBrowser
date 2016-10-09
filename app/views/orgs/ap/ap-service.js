'use strict';
angular.module('myApp').factory('apApi', function($resource) {
    return $resource('/api/scm.config/1.0/orgs/ap', {}, 
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

angular.module('myApp').service('apCurrent', function() {
  this.ap = { id: ''};
  this.setap = function(id){ 
  	console.log('setting current ap to: ' + id);
    this.ap.id = id;
  }
  this.getap = function(){
    return this.ap;
  }
});
