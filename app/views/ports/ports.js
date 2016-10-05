'use strict';

angular.module('myApp.Ports', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/ports', {
    templateUrl: 'views/ports/ports.html',
    controller: 'PortsCtrl'
  });
}])
.controller('PortsCtrl',
		[ '$scope', 'apiPorts', '$location', 'currentPorts', '$timeout',
			function($scope, apiPorts, $location, currentPorts, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.Ports = apiPorts.query();
				$scope.PortsSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.PortsGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'id', field:'id'/*, visible: */},
						{ name:'port_id', field:'port_id'/*, visible: */},
						{ name:'node', field:'node'/*, visible: */},
						{ name:'tag', field:'tag'/*, visible: */},
						{ name:'type', field:'type'/*, visible: */},
						{ name:'speeds', field:'speeds'/*, visible: */},
						{ name:'speed', field:'speed'/*, visible: */},
						{ name:'patchlabel', field:'patchlabel'/*, visible: */},
						{ name:'zone', field:'zone'/*, visible: */},
						{ name:'uplink', field:'uplink'/*, visible: */},
						{ name:'portal', field:'portal'/*, visible: */},
						{ name:'mac', field:'mac'/*, visible: */},
						{ name:'virtual_mac', field:'virtual_mac'/*, visible: */},
						{ name:'switch_id', field:'switch_id'/*, visible: */},
						{ name:'autotrunk', field:'autotrunk'/*, visible: */},
						{ name:'bridge_with', field:'bridge_with'/*, visible: */},
						{ name:'ifname', field:'ifname'/*, visible: */},
						{ name:'dcinterface', field:'dcinterface'/*, visible: */},
						{ name:'auto', field:'auto'/*, visible: */},
						{ name:'autocfg', field:'autocfg'/*, visible: */},
					],
					data: $scope.Ports,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					apiPorts.save(newObject).$promise.then(function(data){
    						$scope.Ports.push(data);
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
                			$scope.PortsSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        			},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.PortsSelected = undefined;
				}
				
				$scope.PortsFields = [
						{key: 'id', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'id', placeholder: "id", required: false
            				}
          				},
						{key: 'port_id', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'port_id', placeholder: "port_id", required: false
            				}
          				},
						{key: 'node', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'node', placeholder: "node", required: false
            				}
          				},
						{key: 'tag', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'tag', placeholder: "Port tag", required: false
            				}
          				},
						{key: 'type', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'type', placeholder: "Port type", required: false
            				}
          				},
						{key: 'speeds', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'speeds', placeholder: "speeds, in MBit&#x2F;Sec", required: false
            				}
          				},
						{key: 'speed', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'speed', placeholder: "speed", required: false
            				}
          				},
						{key: 'patchlabel', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'patchlabel', placeholder: "User-defined patch label. Limited to 16 chars", required: false
            				}
          				},
						{key: 'zone', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'zone', placeholder: "The zone&#x2F;segment assigned to this port", required: false
            				}
          				},
						{key: 'uplink', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'uplink', placeholder: "The uplink assigned to this port", required: false
            				}
          				},
						{key: 'portal', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'portal', placeholder: "portal", required: false
            				}
          				},
						{key: 'mac', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'mac', placeholder: "MAC address. For switch ports, contains the MAC of the switch", required: false
            				}
          				},
						{key: 'virtual_mac', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'virtual_mac', placeholder: "Virtual MAC", required: false
            				}
          				},
						{key: 'switch_id', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'switch_id', placeholder: "switch ID", required: false
            				}
          				},
						{key: 'autotrunk', type: 'input',
            				templateOptions: {
                				type: 'boolean', label: 'autotrunk', placeholder: "AutoTrunking", required: false
            				}
          				},
						{key: 'bridge_with', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'bridge_with', placeholder: "Bridge with another port", required: false
            				}
          				},
						{key: 'ifname', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'ifname', placeholder: "Logical interface name", required: false
            				}
          				},
						{key: 'dcinterface', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'dcinterface', placeholder: "dcinterface", required: false
            				}
          				},
						{key: 'auto', type: 'input',
            				templateOptions: {
                				type: 'boolean', label: 'auto', placeholder: "Automatic provisioning. Every node has one of these ports", required: false
            				}
          				},
						{key: 'autocfg', type: 'input',
            				templateOptions: {
                				type: 'boolean', label: 'autocfg', placeholder: "This is set if the port config was automatically set (autoport logic)", required: false
            				}
          				},
				];
		}]
)
;