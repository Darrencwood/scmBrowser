'use strict';
angular.module('myApp.dcinterfaces', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/dcinterfaces', {
  	templateUrl: 'views/dcinterfaces/dcinterfaces.html',
    controller: 'dcinterfacesCtrl'
  });
}])
.controller('dcinterfacesCtrl',
		[ '$scope', 'dcinterfacesApi', '$location', 'dcinterfacesSelectionSvc', '$timeout', 
			function($scope, dcinterfacesApi, $location, dcinterfacesSelectionSvc, $timeout  ) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				$scope.dcinterfaces = dcinterfacesApi.query();
				
				$scope.dcinterfacesSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.dcinterfacesGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					enableSelectAll: true,
					exporterMenuPdf: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					exporterCsvFilename: ':dcinterfaceid.csv',
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
					data: $scope.dcinterfaces,
						rowTemplate: '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					dcinterfacesApi.save(newObject).$promise.then(function(data){
    						$scope.dcinterfaces.push(data);
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
            				dcinterfacesApi.update(req, rowEntity).$promise.then(function(success){
            					// Do nothing , we already updated the table.
            				}, function(error){
            					// TODO: Rollback change.
            				});
          				});
    					}
				};
  			     
				$scope.click = function(row){ 
					$scope.clicked = $timeout(function(){
						if ($scope.stopped == false){
                					$scope.dcinterfacesSelected = row.entity;
							$scope.showSelectedRecord = true;
							//console.log(row.entity);	
							dcinterfacesSelectionSvc.setdcinterfaces(row.entity);
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.dcinterfacesSelected = undefined;
				}
				
				$scope.deleteRow = function(row) {
					$scope.stopped = $timeout.cancel($scope.clicked);
					console.log('Deleting ' + row.entity.id);	
					let req = { };
					req['dcinterfaceid'] = row.entity.id;
					dcinterfacesApi.delete(req).$promise.then(function(success){
						for (let i=0; i<$scope.dcinterfaces.length; i++){
							if ($scope.dcinterfaces[i].id == row.entity.id) {
								$scope.dcinterfaces.splice(i, 1);
								refresh();
								break;
							}
						}
					}, function(error){
						console.log(error);
					});

				}
				
				$scope.dcinterfacesFields = [
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