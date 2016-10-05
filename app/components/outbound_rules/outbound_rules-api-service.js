'use strict';

angular.module('myApp').factory('apiOutboundrules', function($resource) {
    return $resource('/api/scm.config/1.0/outbound_rules', {}, 
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

angular.module('myApp').service('currentOutboundrules', function() {
  this.Outboundrules = { id: ''};
  this.setOutboundrules = function(id){ 
  	console.log('setting current Outboundrules to: ' + id);
    this.Outboundrules.id = id;
  }
  this.getOutboundrules = function(){
    return this.Outboundrules;
  }
});
