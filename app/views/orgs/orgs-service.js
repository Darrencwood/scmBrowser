'use strict';
angular.module('myApp').factory('orgsApi', function($resource) {
    return $resource('/api/scm.config/1.0/orgs', {}, 
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

angular.module('myApp').service('orgsSelectionSvc', function() {
  this.orgs = { id: ''};
  this.setorgs = function(id){ 
  	console.log('setting current orgs to: ' + id);
    this.orgs.id = id;
  }
  this.getorgs = function(){
    return this.orgs;
  }
});
