'use strict';
angular.module('myApp').factory('orgsBroadcastsApi', function($resource) {
    return $resource('/api/scm.config/1.0/org/:orgid/broadcasts', {}, 
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

angular.module('myApp').service('orgsBroadcastsSelectionSvc', function() {
  this.orgsBroadcasts = { };
  this.setorgsBroadcasts = function(obj){ 
  	console.log('setting current orgsBroadcasts to: ' + obj.id);
    this.orgsBroadcasts = obj;
  }
  this.getorgsBroadcasts = function(){
    return this.orgsBroadcasts;
  }
});
