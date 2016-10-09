'use strict';
angular.module('myApp').factory('wansApi', function($resource) {
    return $resource('/api/scm.config/1.0/orgs/wans', {}, 
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

angular.module('myApp').service('wansCurrent', function() {
  this.wans = { id: ''};
  this.setwans = function(id){ 
  	console.log('setting current wans to: ' + id);
    this.wans.id = id;
  }
  this.getwans = function(){
    return this.wans;
  }
});
