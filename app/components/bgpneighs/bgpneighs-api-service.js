'use strict';

angular.module('myApp').factory('apiBgpneighs', function($resource) {
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

angular.module('myApp').service('currentBgpneighs', function() {
  this.Bgpneighs = { id: ''};
  this.setBgpneighs = function(id){ 
  	console.log('setting current Bgpneighs to: ' + id);
    this.Bgpneighs.id = id;
  }
  this.getBgpneighs = function(){
    return this.Bgpneighs;
  }
});
