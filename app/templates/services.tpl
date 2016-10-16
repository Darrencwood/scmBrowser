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
    	},
    	'delete': {
    		method: 'DELETE',
    		url: '/api/scm.config/1.0{{& delete}}',
    		params: { {{deleteId}}: '@{{deleteId}}' } 
    	},
    	'update': {
    		method: 'PUT',
    		url: '/api/scm.config/1.0{{& put}}',
    		params: { {{putId}}: '@{{putId}}' } 
    	}
    	
    });
});

angular.module('myApp').service('{{name}}SelectionSvc', function() {
  this.{{name}} = { };
  this.set{{name}} = function(obj){ 
  	console.log('setting current {{name}} to: ' + obj.{{selectedSubmenu}});
    this.{{name}} = obj;
  }
  this.get{{name}} = function(){
    return this.{{name}};
  }
});
{{/ops.get.values}}