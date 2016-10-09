'use strict';
angular.module('myApp').factory('sitesUplinksApi', function($resource) {
    return $resource('/api/scm.config/1.0/site/:siteid/uplinks', {}, 
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

angular.module('myApp').service('sitesUplinksSelectionSvc', function() {
  this.sitesUplinks = { id: ''};
  this.setsitesUplinks = function(id){ 
  	console.log('setting current sitesUplinks to: ' + id);
    this.sitesUplinks.id = id;
  }
  this.getsitesUplinks = function(){
    return this.sitesUplinks;
  }
});
