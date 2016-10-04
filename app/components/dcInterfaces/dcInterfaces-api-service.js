'use strict';

angular.module('myApp').factory('apiDCInterfaces', function($resource) {
    return $resource('/api/scm.config/1.0/dcinterfaces', {}, 
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

angular.module('myApp').service('currentDCInterfaces', function() {
  this.dcInterfaces = { id: ''};
  this.setDCInterfaces = function(id){ 
  	console.log('setting current DCInterfaces to: ' + id);
    this.dcInterfaces.id = id;
  }
  this.getDCInterfaces = function(){
    return this.dcInterfaces;
  }
});

