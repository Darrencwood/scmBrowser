'use strict';
angular.module('myApp').factory('orgsBgpneighsApi', function($resource) {
    return $resource('/api/scm.config/1.0/org/:orgid/bgpneighs', {}, 
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

angular.module('myApp').service('orgsBgpneighsSelectionSvc', function() {
  this.orgsBgpneighs = { id: ''};
  this.setorgsBgpneighs = function(id){ 
  	console.log('setting current orgsBgpneighs to: ' + id);
    this.orgsBgpneighs.id = id;
  }
  this.getorgsBgpneighs = function(){
    return this.orgsBgpneighs;
  }
});
