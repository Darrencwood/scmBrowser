'use strict';
angular.module('myApp').factory('orgsApApi', function($resource) {
    return $resource('/api/scm.config/1.0/org/:orgid/ap', {}, 
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

angular.module('myApp').service('orgsApSelectionSvc', function() {
  this.orgsAp = { id: ''};
  this.setorgsAp = function(id){ 
  	console.log('setting current orgsAp to: ' + id);
    this.orgsAp.id = id;
  }
  this.getorgsAp = function(){
    return this.orgsAp;
  }
});
