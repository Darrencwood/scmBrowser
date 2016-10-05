'use strict';

angular.module('myApp').factory('api{{capWord}}', function($resource) {
    return $resource('/api/scm.config/1.0{{& path}}', {}, 
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

angular.module('myApp').service('current{{capWord}}', function() {
  this.{{capWord}} = { id: ''};
  this.set{{capWord}} = function(id){ 
  	console.log('setting current {{capWord}} to: ' + id);
    this.{{capWord}}.id = id;
  }
  this.get{{capWord}} = function(){
    return this.{{capWord}};
  }
});
