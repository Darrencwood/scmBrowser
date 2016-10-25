angular.module('myApp').service('proxyRegisterSvc',['apiProxyRegisterSettings', function(apiProxyRegisterSettings) {
  this.proxy = { };
  this.setUrl = function(url){ 
    if (url != '') {
      this.proxy.url = url;
      apiProxyRegisterSettings.save({}, this.proxy);
      return;
    }
  }
  
  this.getProxy = function() {
    return this.proxy;
  }  
}]);

angular.module('myApp').factory('apiProxyRegisterSettings', function($resource) {
    return $resource('/proxy/registerUrl');
});