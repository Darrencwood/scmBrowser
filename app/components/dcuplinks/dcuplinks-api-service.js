'use strict';

angular.module('myApp').factory('apiDcuplinks', function($resource) {
    return $resource('/api/scm.config/1.0/dcuplinks', {}, 
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

angular.module('myApp').service('currentDcuplinks', function() {
  this.Dcuplinks = { id: ''};
  this.setDcuplinks = function(id){ 
  	console.log('setting current Dcuplinks to: ' + id);
    this.Dcuplinks.id = id;
  }
  this.getDcuplinks = function(){
    return this.Dcuplinks;
  }
});
