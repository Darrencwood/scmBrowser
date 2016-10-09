'use strict';
angular.module('myApp').factory('broadcastsApi', function($resource) {
    return $resource('/api/scm.config/1.0/orgs/broadcasts', {}, 
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

angular.module('myApp').service('broadcastsCurrent', function() {
  this.broadcasts = { id: ''};
  this.setbroadcasts = function(id){ 
  	console.log('setting current broadcasts to: ' + id);
    this.broadcasts.id = id;
  }
  this.getbroadcasts = function(){
    return this.broadcasts;
  }
});
