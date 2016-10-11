'use strict';
angular.module('myApp').factory('orgsDcuplinksApi', function($resource) {
    return $resource('/api/scm.config/1.0/org/:orgid/dcuplinks', {}, 
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

angular.module('myApp').service('orgsDcuplinksSelectionSvc', function() {
  this.orgsDcuplinks = { };
  this.setorgsDcuplinks = function(obj){ 
  	console.log('setting current orgsDcuplinks to: ' + obj.id);
    this.orgsDcuplinks = obj;
  }
  this.getorgsDcuplinks = function(){
    return this.orgsDcuplinks;
  }
});
