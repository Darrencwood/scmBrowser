'use strict';

angular.module('myApp').factory('apiSsids', function($resource) {
    return $resource('/api/scm.config/1.0/ssids', {}, 
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

angular.module('myApp').service('currentSsids', function() {
  this.Ssids = { id: ''};
  this.setSsids = function(id){ 
  	console.log('setting current Ssids to: ' + id);
    this.Ssids.id = id;
  }
  this.getSsids = function(){
    return this.Ssids;
  }
});
