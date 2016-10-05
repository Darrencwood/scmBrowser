'use strict';

angular.module('myApp.Devices', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/devices', {
    templateUrl: 'views/devices/devices.html',
    controller: 'DevicesCtrl'
  });
}])
.controller('DevicesCtrl',
		[ '$scope', 'apiDevices', '$location', 'currentDevices', '$timeout',
			function($scope, apiDevices, $location, currentDevices, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.Devices = apiDevices.query();
				$scope.DevicesSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.DevicesGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'id', field:'id'/*, visible: */},
						{ name:'uid', field:'uid'/*, visible: */},
						{ name:'user', field:'user'/*, visible: */},
						{ name:'mac', field:'mac'/*, visible: */},
						{ name:'info', field:'info'/*, visible: */},
						{ name:'ipv4', field:'ipv4'/*, visible: */},
						{ name:'ipv6', field:'ipv6'/*, visible: */},
						{ name:'org', field:'org'/*, visible: */},
						{ name:'devgrps', field:'devgrps'/*, visible: */},
						{ name:'tags', field:'tags'/*, visible: */},
						{ name:'net', field:'net'/*, visible: */},
						{ name:'endpoint', field:'endpoint'/*, visible: */},
					],
					data: $scope.Devices,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					apiDevices.save(newObject).$promise.then(function(data){
    						$scope.Devices.push(data);
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
                			$scope.DevicesSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        			},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.DevicesSelected = undefined;
				}
				
				$scope.DevicesFields = [
						{key: 'id', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'id', placeholder: "id", required: false
            				}
          				},
						{key: 'uid', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'uid', placeholder: "uid", required: false
            				}
          				},
						{key: 'user', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'user', placeholder: "user", required: false
            				}
          				},
						{key: 'mac', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'mac', placeholder: "mac", required: false
            				}
          				},
						{key: 'info', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'info', placeholder: "info", required: false
            				}
          				},
						{key: 'ipv4', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'ipv4', placeholder: "ipv4", required: false
            				}
          				},
						{key: 'ipv6', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'ipv6', placeholder: "ipv6", required: false
            				}
          				},
						{key: 'org', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'org', placeholder: "org", required: false
            				}
          				},
						{key: 'devgrps', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'devgrps', placeholder: "devgrps", required: false
            				}
          				},
						{key: 'tags', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'tags', placeholder: "tags", required: false
            				}
          				},
						{key: 'net', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'net', placeholder: "Zone &#x2F; Net", required: false
            				}
          				},
						{key: 'endpoint', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'endpoint', placeholder: "endpoint", required: false
            				}
          				},
				];
		}]
)
;