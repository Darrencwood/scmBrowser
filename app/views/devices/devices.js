'use strict';
angular.module('myApp.devices', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/devices', {
  	templateUrl: 'views/devices/devices.html',
    controller: 'devicesCtrl'
  });
}])
.controller('devicesCtrl',
		[ '$scope', 'devicesApi', '$location', 'devicesSelectionSvc', '$timeout', 
			function($scope, devicesApi, $location, devicesSelectionSvc, $timeout  ) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				$scope.devices = devicesApi.query();
				
				$scope.devicesSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.devicesGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					rowHeight: 40,
					columnDefs: [
						{ name:'Id', field:'id'/*, visible: */},
						{ name:'Uid', field:'uid'/*, visible: */},
						{ name:'User', field:'user'/*, visible: */},
						{ name:'Mac', field:'mac'/*, visible: */},
						{ name:'Info', field:'info'/*, visible: */},
						{ name:'Ipv4', field:'ipv4'/*, visible: */},
						{ name:'Ipv6', field:'ipv6'/*, visible: */},
						{ name:'Org', field:'org'/*, visible: */},
						{ name:'Devgrps', field:'devgrps'/*, visible: */},
						{ name:'Tags', field:'tags'/*, visible: */},
						{ name:'Net', field:'net'/*, visible: */},
						{ name:'Endpoint', field:'endpoint'/*, visible: */},
					],
					data: $scope.devices,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					devicesApi.save(newObject).$promise.then(function(data){
    						$scope.devices.push(data);
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
                					$scope.devicesSelected = row.entity;
							$scope.showSelectedRecord = true;
							console.log(row.entity);	
							devicesSelectionSvc.setdevices(row.entity);
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.devicesSelected = undefined;
				}
				
				$scope.devicesFields = [
						{key: 'id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'id', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'uid', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'uid', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'user', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'user', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'mac', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'mac', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'info', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'info', placeholder: "", disabled: true/*, required: */ 
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
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'devgrps', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'devgrps', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'tags', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'tags', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'net', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'net', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'endpoint', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'endpoint', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
				];
}]);