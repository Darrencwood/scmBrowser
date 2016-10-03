'use strict';

angular.module('myApp').factory('api{{title}}', function($resource) {
    return $resource('/api/scm.config/1.0/{{fieldName}}', {}, 
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

angular.module('myApp').service('current{{title}}', function() {
  this.{{camel}} = { id: ''};
  this.set{{title}} = function(id){ 
  	console.log('setting current {{title}} to: ' + id);
    this.{{camel}}.id = id;
  }
  this.get{{title}} = function(){
    return this.{{camel}};
  }
});
