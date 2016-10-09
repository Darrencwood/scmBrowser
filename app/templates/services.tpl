'use strict';
{{#ops.get.values}}
angular.module('myApp').factory('{{name}}Api', function($resource) {
{{/ops.get.values}}
    return $resource('/api/scm.config/1.0{{& path}}', {}, 
{{#ops.get.values}}
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

angular.module('myApp').service('{{name}}SelectionSvc', function() {
  this.{{name}} = { id: ''};
  this.set{{name}} = function(id){ 
  	console.log('setting current {{name}} to: ' + id);
    this.{{name}}.id = id;
  }
  this.get{{name}} = function(){
    return this.{{name}};
  }
});
{{/ops.get.values}}