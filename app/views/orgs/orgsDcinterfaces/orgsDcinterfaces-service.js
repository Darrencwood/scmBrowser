'use strict';
angular.module('myApp').factory('orgsDcinterfacesApi', function($resource) {
    return $resource('/api/scm.config/1.0/org/:orgid/dcinterfaces', {}, 
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

angular.module('myApp').service('orgsDcinterfacesSelectionSvc', function() {
  this.orgsDcinterfaces = { id: ''};
  this.setorgsDcinterfaces = function(id){ 
  	console.log('setting current orgsDcinterfaces to: ' + id);
    this.orgsDcinterfaces.id = id;
  }
  this.getorgsDcinterfaces = function(){
    return this.orgsDcinterfaces;
  }
});
