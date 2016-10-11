'use strict';
angular.module('myApp').factory('dcinterfacesApi', function($resource) {
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

angular.module('myApp').service('dcinterfacesSelectionSvc', function() {
  this.dcinterfaces = { };
  this.setdcinterfaces = function(obj){ 
  	console.log('setting current dcinterfaces to: ' + obj.id);
    this.dcinterfaces = obj;
  }
  this.getdcinterfaces = function(){
    return this.dcinterfaces;
  }
});
