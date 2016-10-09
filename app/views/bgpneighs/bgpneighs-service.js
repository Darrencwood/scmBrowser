'use strict';
angular.module('myApp').factory('bgpneighsApi', function($resource) {
    return $resource('/api/scm.config/1.0/bgpneighs', {}, 
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

angular.module('myApp').service('bgpneighsSelectionSvc', function() {
  this.bgpneighs = { id: ''};
  this.setbgpneighs = function(id){ 
  	console.log('setting current bgpneighs to: ' + id);
    this.bgpneighs.id = id;
  }
  this.getbgpneighs = function(){
    return this.bgpneighs;
  }
});
