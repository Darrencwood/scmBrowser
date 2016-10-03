
'use strict';

angular.module('myApp').factory('apiEndPoints', function($resource) {
    return $resource('/api/scm.config/1.0/endpoints', {}, 
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

angular.module('myApp').service('currentEndPoints', function() {
  this.endPoints = { id: ''};
  this.setEndPoints = function(id){ 
  	console.log('setting current EndPoints to: ' + id);
    this.endPoints.id = id;
  }
  this.getEndPoints = function(){
    return this.endPoints;
  }
});