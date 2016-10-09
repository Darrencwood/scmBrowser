'use strict';
angular.module('myApp').factory('orgsNetworksApi', function($resource) {
    return $resource('/api/scm.config/1.0/org/:orgid/networks', {}, 
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

angular.module('myApp').service('orgsNetworksSelectionSvc', function() {
  this.orgsNetworks = { id: ''};
  this.setorgsNetworks = function(id){ 
  	console.log('setting current orgsNetworks to: ' + id);
    this.orgsNetworks.id = id;
  }
  this.getorgsNetworks = function(){
    return this.orgsNetworks;
  }
});
