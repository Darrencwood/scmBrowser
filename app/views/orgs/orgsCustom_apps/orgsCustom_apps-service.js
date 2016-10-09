'use strict';
angular.module('myApp').factory('orgsCustom_appsApi', function($resource) {
    return $resource('/api/scm.config/1.0/org/:orgid/custom_apps', {}, 
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

angular.module('myApp').service('orgsCustom_appsSelectionSvc', function() {
  this.orgsCustom_apps = { id: ''};
  this.setorgsCustom_apps = function(id){ 
  	console.log('setting current orgsCustom_apps to: ' + id);
    this.orgsCustom_apps.id = id;
  }
  this.getorgsCustom_apps = function(){
    return this.orgsCustom_apps;
  }
});
