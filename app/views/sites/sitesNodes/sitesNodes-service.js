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
  this.sitesNodes = { };
  this.setsitesNodes = function(obj){ 
  	console.log('setting current sitesNodes to: ' + obj.id);
    this.sitesNodes = obj;
  }
  this.getsitesNodes = function(){
    return this.sitesNodes;
  }
});
