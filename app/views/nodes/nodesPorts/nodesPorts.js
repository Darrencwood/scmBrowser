'use strict';
angular.module('myApp.nodesPorts', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/nodesPorts', {
    templateUrl: 'views/nodesPorts/nodesPorts.html',
    controller: 'nodesPortsCtrl'
  });
}])
.controller('nodesPortsCtrl',
		[ '$scope', 'nodesPortsApi', '$location', 'nodesPortsSelectionSvc', '$timeout',
			function($scope, nodesPortsApi, $location, nodesPortsSelectionSvc, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.nodesPorts = nodesPortsApi.query();
				$scope.nodesPortsSelected = '';
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
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'Id', field:'id'/*, visible: */},
						{ name:'Port', field:'port_id'/*, visible: */},
						{ name:'Node', field:'node'/*, visible: */},
						{ name:'Tag', field:'tag'/*, visible: */},
						{ name:'Type', field:'type'/*, visible: */},
						{ name:'Speeds', field:'speeds'/*, visible: */},
						{ name:'Speed', field:'speed'/*, visible: */},
						{ name:'Patchlabel', field:'patchlabel'/*, visible: */},
						{ name:'Zone', field:'zone'/*, visible: */},
						{ name:'Uplink', field:'uplink'/*, visible: */},
						{ name:'Portal', field:'portal'/*, visible: */},
						{ name:'Mac', field:'mac'/*, visible: */},
						{ name:'Virtual Mac', field:'virtual_mac'/*, visible: */},
						{ name:'Switch', field:'switch_id'/*, visible: */},
						{ name:'Autotrunk', field:'autotrunk'/*, visible: */},
						{ name:'Bridge With', field:'bridge_with'/*, visible: */},
						{ name:'Ifname', field:'ifname'/*, visible: */},
						{ name:'Dcinterface', field:'dcinterface'/*, visible: */},
						{ name:'Auto', field:'auto'/*, visible: */},
						{ name:'Autocfg', field:'autocfg'/*, visible: */},
					],
					data: $scope.nodesPorts,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					nodesPortsApi.save(newObject).$promise.then(function(data){
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
      						//$scope.gridApi.rowEdit.on.saveRow($scope,
      						//$scope.saveRow);
    					}
				};
  			     
				$scope.click = function(row){ 
					$scope.clicked = $timeout(function(){
						if ($scope.stopped == false){
                					$scope.nodesPortsSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.nodesPortsSelected = undefined;
				}
				
				$scope.nodesPortsFields = [
						{key: 'id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'id', placeholder: ""/*, required: */
            					}
          				},
						{key: 'port_id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'port_id', placeholder: ""/*, required: */
            					}
          				},
						{key: 'node', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'node', placeholder: ""/*, required: */
            					}
          				},
						{key: 'tag', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'tag', placeholder: ""/*, required: */
            					}
          				},
						{key: 'type', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'type', placeholder: ""/*, required: */
            					}
          				},
						{key: 'speeds', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'speeds', placeholder: ""/*, required: */
            					}
          				},
						{key: 'speed', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'speed', placeholder: ""/*, required: */
            					}
          				},
						{key: 'patchlabel', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'patchlabel', placeholder: ""/*, required: */
            					}
          				},
						{key: 'zone', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'zone', placeholder: ""/*, required: */
            					}
          				},
						{key: 'uplink', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'uplink', placeholder: ""/*, required: */
            					}
          				},
						{key: 'portal', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'portal', placeholder: ""/*, required: */
            					}
          				},
						{key: 'mac', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'mac', placeholder: ""/*, required: */
            					}
          				},
						{key: 'virtual_mac', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'virtual_mac', placeholder: ""/*, required: */
            					}
          				},
						{key: 'switch_id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'switch_id', placeholder: ""/*, required: */
            					}
          				},
						{key: 'autotrunk', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'autotrunk', placeholder: ""/*, required: */
            					}
          				},
						{key: 'bridge_with', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'bridge_with', placeholder: ""/*, required: */
            					}
          				},
						{key: 'ifname', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'ifname', placeholder: ""/*, required: */
            					}
          				},
						{key: 'dcinterface', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'dcinterface', placeholder: ""/*, required: */
            					}
          				},
						{key: 'auto', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'auto', placeholder: ""/*, required: */
            					}
          				},
						{key: 'autocfg', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'autocfg', placeholder: ""/*, required: */
            					}
          				},
				];
}]);