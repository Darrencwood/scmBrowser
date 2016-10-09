'use strict';
angular.module('myApp').factory('orgsWansApi', function($resource) {
    return $resource('/api/scm.config/1.0/org/:orgid/wans', {}, 
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

angular.module('myApp').service('orgsWansSelectionSvc', function() {
  this.orgsWans = { id: ''};
  this.setorgsWans = function(id){ 
  	console.log('setting current orgsWans to: ' + id);
    this.orgsWans.id = id;
  }
  this.getorgsWans = function(){
    return this.orgsWans;
  }
});
