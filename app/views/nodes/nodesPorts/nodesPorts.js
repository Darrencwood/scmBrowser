'use strict';
angular.module('myApp.nodesPorts', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/nodes/nodesPorts', {
  templateUrl: 'views/nodes/nodesPorts/nodesPorts.html',
    controller: 'nodesPortsCtrl'
  });
}])
.controller('nodesPortsCtrl',
		[ '$scope', 'nodesPortsApi', '$location', 'nodesPortsSelectionSvc', '$timeout' , 'nodesSelectionSvc'   , 'proxyRegisterSvc', 
			function($scope, nodesPortsApi, $location, nodesPortsSelectionSvc, $timeout  , nodesSelectionSvc  , proxyRegisterSvc) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				$scope.isProxyRegister = function() {
					return proxyRegisterSvc.hasRegister;
				}
				
				$scope.nodesPortsSelected = nodesSelectionSvc.getnodes();
				$scope.nodesPorts = nodesPortsApi.query({ nodeid: $scope.nodesPortsSelected.id });
				
				
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.nodesPortsGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					exporterMenuPdf: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					exporterCsvFilename: 'ports.csv',
					exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
					rowHeight: 40,
					columnDefs: [
					{ name: 'delete',
					  cellTemplate: '<a id="delete" class="btn btn-danger" role="button" ng-click="grid.appScope.deleteRow(row)"> <span class="glyphicon glyphicon-trash"></span></a>'
					},
						{ name:'Id', field:'id'/*, visible: */, enableCellEdit: ('id'=='id' || 'id'=='uid' || 'id'=='gid')? false: true},
						{ name:'Port', field:'port_id'/*, visible: */, enableCellEdit: ('port_id'=='id' || 'port_id'=='uid' || 'port_id'=='gid')? false: true},
						{ name:'Node', field:'node'/*, visible: */, enableCellEdit: ('node'=='id' || 'node'=='uid' || 'node'=='gid')? false: true},
						{ name:'Tag', field:'tag'/*, visible: */, enableCellEdit: ('tag'=='id' || 'tag'=='uid' || 'tag'=='gid')? false: true},
						{ name:'Type', field:'type'/*, visible: */, enableCellEdit: ('type'=='id' || 'type'=='uid' || 'type'=='gid')? false: true},
						{ name:'Speeds', field:'speeds'/*, visible: */, enableCellEdit: ('speeds'=='id' || 'speeds'=='uid' || 'speeds'=='gid')? false: true},
						{ name:'Speed', field:'speed'/*, visible: */, enableCellEdit: ('speed'=='id' || 'speed'=='uid' || 'speed'=='gid')? false: true},
						{ name:'Patchlabel', field:'patchlabel'/*, visible: */, enableCellEdit: ('patchlabel'=='id' || 'patchlabel'=='uid' || 'patchlabel'=='gid')? false: true},
						{ name:'Zone', field:'zone'/*, visible: */, enableCellEdit: ('zone'=='id' || 'zone'=='uid' || 'zone'=='gid')? false: true},
						{ name:'Uplink', field:'uplink'/*, visible: */, enableCellEdit: ('uplink'=='id' || 'uplink'=='uid' || 'uplink'=='gid')? false: true},
						{ name:'Portal', field:'portal'/*, visible: */, enableCellEdit: ('portal'=='id' || 'portal'=='uid' || 'portal'=='gid')? false: true},
						{ name:'Mac', field:'mac'/*, visible: */, enableCellEdit: ('mac'=='id' || 'mac'=='uid' || 'mac'=='gid')? false: true},
						{ name:'Virtual Mac', field:'virtual_mac'/*, visible: */, enableCellEdit: ('virtual_mac'=='id' || 'virtual_mac'=='uid' || 'virtual_mac'=='gid')? false: true},
						{ name:'Switch', field:'switch_id'/*, visible: */, enableCellEdit: ('switch_id'=='id' || 'switch_id'=='uid' || 'switch_id'=='gid')? false: true},
						{ name:'Autotrunk', field:'autotrunk'/*, visible: */, enableCellEdit: ('autotrunk'=='id' || 'autotrunk'=='uid' || 'autotrunk'=='gid')? false: true},
						{ name:'Bridge With', field:'bridge_with'/*, visible: */, enableCellEdit: ('bridge_with'=='id' || 'bridge_with'=='uid' || 'bridge_with'=='gid')? false: true},
						{ name:'Ifname', field:'ifname'/*, visible: */, enableCellEdit: ('ifname'=='id' || 'ifname'=='uid' || 'ifname'=='gid')? false: true},
						{ name:'Dcinterface', field:'dcinterface'/*, visible: */, enableCellEdit: ('dcinterface'=='id' || 'dcinterface'=='uid' || 'dcinterface'=='gid')? false: true},
						{ name:'Auto', field:'auto'/*, visible: */, enableCellEdit: ('auto'=='id' || 'auto'=='uid' || 'auto'=='gid')? false: true},
						{ name:'Autocfg', field:'autocfg'/*, visible: */, enableCellEdit: ('autocfg'=='id' || 'autocfg'=='uid' || 'autocfg'=='gid')? false: true},
					],
					data: $scope.nodesPorts,
						rowTemplate: '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					nodesPortsApi.save({ nodeid: $scope.nodesPortsSelected.id }, newObject).$promise.then(function(data){
    						$scope.nodesPorts.push(data);
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
							req['portid'] = rowEntity.id;
            				nodesPortsApi.update(req, rowEntity).$promise.then(function(success){
            					// Do nothing , we already updated the table.
            				}, function(error){
            					// TODO: Rollback change.
            				});
          				});
    					}
				};
				$scope.deselect = function(){ 
					nodesPortsSelectionSvc.setnodesPorts();
					$location.path('/nodes');
				}
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.nodesPortsSelected = undefined;
				}
				
				$scope.deleteRow = function(row) {
					$scope.stopped = $timeout.cancel($scope.clicked);
					console.log('Deleting ' + row.entity.id);	
					let req = { };
					req['portid'] = row.entity.id;
					nodesPortsApi.delete(req).$promise.then(function(success){
						for (let i=0; i<$scope.nodesPorts.length; i++){
							if ($scope.nodesPorts[i].id == row.entity.id) {
								$scope.nodesPorts.splice(i, 1);
								refresh();
								break;
							}
						}
					}, function(error){
						console.log(error);
					});

				}
				
				$scope.nodesPortsFields = [
						{key: 'id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'id', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'port_id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'port_id', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'node', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'node', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'tag', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'tag', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'type', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'type', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'speeds', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'speeds', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'speed', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'speed', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'patchlabel', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'patchlabel', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'zone', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'zone', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'uplink', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'uplink', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'portal', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'portal', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'mac', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'mac', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'virtual_mac', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'virtual_mac', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'switch_id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'switch_id', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'autotrunk', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'autotrunk', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'bridge_with', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'bridge_with', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'ifname', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'ifname', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'dcinterface', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'dcinterface', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'auto', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'auto', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'autocfg', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'autocfg', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
				];
}]);