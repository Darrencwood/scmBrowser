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
  this.orgsWans = { };
  this.setorgsWans = function(obj){ 
  	console.log('setting current orgsWans to: ' + obj.id);
    this.orgsWans = obj;
  }
  this.getorgsWans = function(){
    return this.orgsWans;
  }
});
