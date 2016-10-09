'use strict';
angular.module('myApp').factory('dcuplinksApi', function($resource) {
    return $resource('/api/scm.config/1.0/orgs/dcuplinks', {}, 
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

angular.module('myApp').service('dcuplinksCurrent', function() {
  this.dcuplinks = { id: ''};
  this.setdcuplinks = function(id){ 
  	console.log('setting current dcuplinks to: ' + id);
    this.dcuplinks.id = id;
  }
  this.getdcuplinks = function(){
    return this.dcuplinks;
  }
});
