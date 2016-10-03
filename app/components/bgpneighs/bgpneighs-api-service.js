
'use strict';

angular.module('myApp').factory('apiBgpNeighs', function($resource) {
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

angular.module('myApp').service('currentBgpNeighs', function() {
  this.bgpNeighs = { id: ''};
  this.setBgpNeighs = function(id){ 
  	console.log('setting current BgpNeighs to: ' + id);
    this.bgpNeighs.id = id;
  }
  this.getBgpNeighs = function(){
    return this.bgpNeighs;
  }
});