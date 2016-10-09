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

angular.module('myApp').service('dcinterfacesCurrent', function() {
  this.dcinterfaces = { id: ''};
  this.setdcinterfaces = function(id){ 
  	console.log('setting current dcinterfaces to: ' + id);
    this.dcinterfaces.id = id;
  }
  this.getdcinterfaces = function(){
    return this.dcinterfaces;
  }
});
