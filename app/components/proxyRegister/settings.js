'use strict';

angular.module('myApp').service('proxyRegisterSettings', function() {
  this.settings = { scmUrl: 'https://cc.vlab.test'};
  this.setSettings = function(settings){ 
    this.settings = settings;
  }
  this.getSettings = function(){
    return this.settings;
  }
});

angular.module('myApp').factory('apiProxyRegisterSettings', function($resource) {
    return $resource('/proxy/registerUrl');
});

