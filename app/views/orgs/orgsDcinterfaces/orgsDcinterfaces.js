'use strict';
angular.module('myApp.orgsDcinterfaces', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/orgs/orgsDcinterfaces', {
  	templateUrl: 'views/orgs/orgsDcinterfaces/orgsDcinterfaces.html',
    controller: 'orgsDcinterfacesCtrl'
  });
}])
.controller('orgsDcinterfacesCtrl',
		[ '$scope', 'orgsDcinterfacesApi', '$location', 'orgsDcinterfacesSelectionSvc', '$timeout',  'orgsSelectionSvc' , 
			function($scope, orgsDcinterfacesApi, $location, orgsDcinterfacesSelectionSvc, $timeout  , orgsSelectionSvc  ) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				let id = orgsSelectionSvc.getorgs();
				console.log(id);
				$scope.orgsDcinterfaces = orgsDcinterfacesApi.query({ orgid: id.id });
				
				$scope.orgsDcinterfacesSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.orgsDcinterfacesGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					rowHeight: 40,
					columnDefs: [
						{ name:'Org', field:'org'/*, visible: */},
						{ name:'Port', field:'port'/*, visible: */},
						{ name:'Gateway Ipv4', field:'gateway_ipv4'/*, visible: */},
						{ name:'Gateway Ipv6', field:'gateway_ipv6'/*, visible: */},
						{ name:'Ipv4', field:'ipv4'/*, visible: */},
						{ name:'Ipv6', field:'ipv6'/*, visible: */},
						{ name:'Mtu', field:'mtu'/*, visible: */},
						{ name:'Auto Negotiation', field:'auto_negotiation'/*, visible: */},
						{ name:'Enabled', field:'enabled'/*, visible: */},
					],
					data: $scope.orgsDcinterfaces,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					orgsDcinterfacesApi.save({ orgid: id.id }, newObject).$promise.then(function(data){
    						$scope.orgsDcinterfaces.push(data);
    						$scope.updateResults.push({status: "ok", message: 'created.'});
    						refresh();
    					},function(error){
    						$scope.updateResults.push({status: "error", message: error.data.error.message});
						refresh();
    					});
    				},
    				onRegisterApi: function(gridApi){ 
      					$scope.gridApi = gridApi;
      						//$scope.gridApi.rowEdit.on.saveRow($scope,
      						//$scope.saveRow);
    					}
				};
  			     
				$scope.click = function(row){ 
					$scope.clicked = $timeout(function(){
						if ($scope.stopped == false){
                					$scope.orgsDcinterfacesSelected = row.entity;
							$scope.showSelectedRecord = true;
							console.log(row.entity);	
							orgsDcinterfacesSelectionSvc.setorgsDcinterfaces(row.entity);
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.orgsDcinterfacesSelected = undefined;
				}
				
				$scope.orgsDcinterfacesFields = [
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'port', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'port', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'gateway_ipv4', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'gateway_ipv4', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'gateway_ipv6', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'gateway_ipv6', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'ipv4', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'ipv4', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'ipv6', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'ipv6', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'mtu', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'mtu', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'auto_negotiation', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'auto_negotiation', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'enabled', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'enabled', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
				];
}]);