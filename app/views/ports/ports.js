'use strict';
angular.module('myApp.ports', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/ports', {
    templateUrl: 'views/ports/ports.html',
    controller: 'portsCtrl'
  });
}])
.controller('portsCtrl',
		[ '$scope', 'portsApi', '$location', 'portsSelectionSvc', '$timeout',
			function($scope, portsApi, $location, portsSelectionSvc, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.ports = portsApi.query();
				$scope.portsSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.portsGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					rowHeight: 40,
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
					data: $scope.ports,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					portsApi.save(newObject).$promise.then(function(data){
    						$scope.ports.push(data);
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
                					$scope.portsSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.portsSelected = undefined;
				}
				
				$scope.portsFields = [
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