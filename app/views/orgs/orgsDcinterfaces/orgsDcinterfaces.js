'use strict';
angular.module('myApp.orgsDcinterfaces', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/orgs/orgsDcinterfaces', {
  templateUrl: 'views/orgs/orgsDcinterfaces/orgsDcinterfaces.html',
    controller: 'orgsDcinterfacesCtrl'
  });
}])
.controller('orgsDcinterfacesCtrl',
		[ '$scope', 'orgsDcinterfacesApi', '$location', 'orgsDcinterfacesSelectionSvc', '$timeout' , 'orgsSelectionSvc'   , 'proxyRegisterSvc', 
			function($scope, orgsDcinterfacesApi, $location, orgsDcinterfacesSelectionSvc, $timeout  , orgsSelectionSvc  , proxyRegisterSvc) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				$scope.isProxyRegister = function() {
					return proxyRegisterSvc.hasRegister;
				}
				
				$scope.orgsDcinterfacesSelected = orgsSelectionSvc.getorgs();
				$scope.orgsDcinterfaces = orgsDcinterfacesApi.query({ orgid: $scope.orgsDcinterfacesSelected.id });
				
				
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
					exporterMenuPdf: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					exporterCsvFilename: 'dcinterfaces.csv',
					exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
					rowHeight: 40,
					columnDefs: [
					{ name: 'delete',
					  cellTemplate: '<a id="delete" class="btn btn-danger" role="button" ng-click="grid.appScope.deleteRow(row)"> <span class="glyphicon glyphicon-trash"></span></a>'
					},
						{ name:'Org', field:'org'/*, visible: */, enableCellEdit: ('org'=='id' || 'org'=='uid' || 'org'=='gid')? false: true},
						{ name:'Port', field:'port'/*, visible: */, enableCellEdit: ('port'=='id' || 'port'=='uid' || 'port'=='gid')? false: true},
						{ name:'Gateway Ipv4', field:'gateway_ipv4'/*, visible: */, enableCellEdit: ('gateway_ipv4'=='id' || 'gateway_ipv4'=='uid' || 'gateway_ipv4'=='gid')? false: true},
						{ name:'Gateway Ipv6', field:'gateway_ipv6'/*, visible: */, enableCellEdit: ('gateway_ipv6'=='id' || 'gateway_ipv6'=='uid' || 'gateway_ipv6'=='gid')? false: true},
						{ name:'Ipv4', field:'ipv4'/*, visible: */, enableCellEdit: ('ipv4'=='id' || 'ipv4'=='uid' || 'ipv4'=='gid')? false: true},
						{ name:'Ipv6', field:'ipv6'/*, visible: */, enableCellEdit: ('ipv6'=='id' || 'ipv6'=='uid' || 'ipv6'=='gid')? false: true},
						{ name:'Mtu', field:'mtu'/*, visible: */, enableCellEdit: ('mtu'=='id' || 'mtu'=='uid' || 'mtu'=='gid')? false: true},
						{ name:'Auto Negotiation', field:'auto_negotiation'/*, visible: */, enableCellEdit: ('auto_negotiation'=='id' || 'auto_negotiation'=='uid' || 'auto_negotiation'=='gid')? false: true},
						{ name:'Enabled', field:'enabled'/*, visible: */, enableCellEdit: ('enabled'=='id' || 'enabled'=='uid' || 'enabled'=='gid')? false: true},
					],
					data: $scope.orgsDcinterfaces,
						rowTemplate: '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					orgsDcinterfacesApi.save({ orgid: $scope.orgsDcinterfacesSelected.id }, newObject).$promise.then(function(data){
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
      					gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
            				console.log('edited row id:' + rowEntity.id + ' Column:' + colDef.name + ' newValue:' + newValue + ' oldValue:' + oldValue);
            				console.log(rowEntity);
            				let req = { };
							req['dcinterfaceid'] = rowEntity.id;
            				orgsDcinterfacesApi.update(req, rowEntity).$promise.then(function(success){
            					// Do nothing , we already updated the table.
            				}, function(error){
            					// TODO: Rollback change.
            				});
          				});
    					}
				};
				$scope.deselect = function(){ 
					orgsDcinterfacesSelectionSvc.setorgsDcinterfaces();
					$location.path('/orgs');
				}
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.orgsDcinterfacesSelected = undefined;
				}
				
				$scope.deleteRow = function(row) {
					$scope.stopped = $timeout.cancel($scope.clicked);
					console.log('Deleting ' + row.entity.id);	
					let req = { };
					req['dcinterfaceid'] = row.entity.id;
					orgsDcinterfacesApi.delete(req).$promise.then(function(success){
						for (let i=0; i<$scope.orgsDcinterfaces.length; i++){
							if ($scope.orgsDcinterfaces[i].id == row.entity.id) {
								$scope.orgsDcinterfaces.splice(i, 1);
								refresh();
								break;
							}
						}
					}, function(error){
						console.log(error);
					});

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