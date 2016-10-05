'use strict';

angular.module('myApp').factory('apiInboundrules', function($resource) {
    return $resource('/api/scm.config/1.0/inbound_rules', {}, 
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

angular.module('myApp').service('currentInboundrules', function() {
  this.Inboundrules = { id: ''};
  this.setInboundrules = function(id){ 
  	console.log('setting current Inboundrules to: ' + id);
    this.Inboundrules.id = id;
  }
  this.getInboundrules = function(){
    return this.Inboundrules;
  }
});
