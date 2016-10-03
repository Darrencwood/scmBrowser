
'use strict';

angular.module('myApp').factory('apiBroadcasts', function($resource) {
    return $resource('/api/scm.config/1.0/broadcasts', {}, 
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

angular.module('myApp').service('currentBroadcasts', function() {
  this.broadcast = { id: ''};
  this.setBroadcasts = function(id){ 
  	console.log('setting current Broadcasts to: ' + id);
    this.broadcast.id = id;
  }
  this.getBroadcasts = function(){
    return this.broadcast;
  }
});