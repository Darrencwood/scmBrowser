'use strict';
angular.module('myApp').factory('dcuplinksApi', function($resource) {
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

angular.module('myApp').service('dcuplinksSelectionSvc', function() {
  this.dcuplinks = { };
  this.setdcuplinks = function(obj){ 
  	console.log('setting current dcuplinks to: ' + obj.id);
    this.dcuplinks = obj;
  }
  this.getdcuplinks = function(){
    return this.dcuplinks;
  }
});
