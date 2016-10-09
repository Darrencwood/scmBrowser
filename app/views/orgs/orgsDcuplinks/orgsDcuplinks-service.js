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
  this.orgsDcuplinks = { id: ''};
  this.setorgsDcuplinks = function(id){ 
  	console.log('setting current orgsDcuplinks to: ' + id);
    this.orgsDcuplinks.id = id;
  }
  this.getorgsDcuplinks = function(){
    return this.orgsDcuplinks;
  }
});
