
'use strict';

angular.module('myApp').factory('apiDCUplinks', function($resource) {
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

angular.module('myApp').service('currentDCUplinks', function() {
  this.dcUplinks = { id: ''};
  this.setDCUplinks = function(id){ 
  	console.log('setting current DCUplinks to: ' + id);
    this.dcUplinks.id = id;
  }
  this.getDCUplinks = function(){
    return this.dcUplinks;
  }
});