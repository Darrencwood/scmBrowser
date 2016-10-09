'use strict';
angular.module('myApp').factory('sitesBroadcastsApi', function($resource) {
    return $resource('/api/scm.config/1.0/site/:siteid/broadcasts', {}, 
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

angular.module('myApp').service('sitesBroadcastsSelectionSvc', function() {
  this.sitesBroadcasts = { id: ''};
  this.setsitesBroadcasts = function(id){ 
  	console.log('setting current sitesBroadcasts to: ' + id);
    this.sitesBroadcasts.id = id;
  }
  this.getsitesBroadcasts = function(){
    return this.sitesBroadcasts;
  }
});
