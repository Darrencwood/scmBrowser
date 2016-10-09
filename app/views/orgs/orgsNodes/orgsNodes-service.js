'use strict';
angular.module('myApp').factory('orgsNodesApi', function($resource) {
    return $resource('/api/scm.config/1.0/org/:orgid/nodes', {}, 
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

angular.module('myApp').service('orgsNodesSelectionSvc', function() {
  this.orgsNodes = { id: ''};
  this.setorgsNodes = function(id){ 
  	console.log('setting current orgsNodes to: ' + id);
    this.orgsNodes.id = id;
  }
  this.getorgsNodes = function(){
    return this.orgsNodes;
  }
});
