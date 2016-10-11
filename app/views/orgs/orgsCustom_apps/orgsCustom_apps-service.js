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
  this.orgsCustom_apps = { };
  this.setorgsCustom_apps = function(obj){ 
  	console.log('setting current orgsCustom_apps to: ' + obj.id);
    this.orgsCustom_apps = obj;
  }
  this.getorgsCustom_apps = function(){
    return this.orgsCustom_apps;
  }
});
