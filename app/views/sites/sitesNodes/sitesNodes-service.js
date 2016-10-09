'use strict';
angular.module('myApp').factory('sitesNodesApi', function($resource) {
    return $resource('/api/scm.config/1.0/site/:siteid/nodes', {}, 
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

angular.module('myApp').service('sitesNodesSelectionSvc', function() {
  this.sitesNodes = { id: ''};
  this.setsitesNodes = function(id){ 
  	console.log('setting current sitesNodes to: ' + id);
    this.sitesNodes.id = id;
  }
  this.getsitesNodes = function(){
    return this.sitesNodes;
  }
});
