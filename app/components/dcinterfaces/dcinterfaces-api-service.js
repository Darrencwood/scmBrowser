'use strict';

angular.module('myApp').factory('apiDcinterfaces', function($resource) {
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

angular.module('myApp').service('currentDcinterfaces', function() {
  this.Dcinterfaces = { id: ''};
  this.setDcinterfaces = function(id){ 
  	console.log('setting current Dcinterfaces to: ' + id);
    this.Dcinterfaces.id = id;
  }
  this.getDcinterfaces = function(){
    return this.Dcinterfaces;
  }
});
