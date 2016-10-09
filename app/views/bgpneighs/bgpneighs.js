'use strict';
angular.module('myApp.bgpneighs', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/bgpneighs', {
    templateUrl: 'views/bgpneighs/bgpneighs.html',
    controller: 'bgpneighsCtrl'
  });
}])
.controller('bgpneighsCtrl',
		[ '$scope', 'bgpneighsApi', '$location', 'bgpneighsSelectionSvc', '$timeout',
			function($scope, bgpneighsApi, $location, bgpneighsSelectionSvc, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.bgpneighs = bgpneighsApi.query();
				$scope.bgpneighsSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.bgpneighsGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'Org', field:'org'/*, visible: */},
						{ name:'Node', field:'node'/*, visible: */},
						{ name:'Name', field:'name'/*, visible: */},
						{ name:'Ipv4', field:'ipv4'/*, visible: */},
						{ name:'Remote As', field:'remote_as'/*, visible: */},
						{ name:'Password', field:'password'/*, visible: */},
						{ name:'Keepalive Time', field:'keepalive_time'/*, visible: */},
						{ name:'Hold Time', field:'hold_time'/*, visible: */},
					],
					data: $scope.bgpneighs,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					bgpneighsApi.save(newObject).$promise.then(function(data){
    						$scope.bgpneighs.push(data);
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
                					$scope.bgpneighsSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.bgpneighsSelected = undefined;
				}
				
				$scope.bgpneighsFields = [
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: ""/*, required: */
            					}
          				},
						{key: 'node', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'node', placeholder: ""/*, required: */
            					}
          				},
						{key: 'name', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'name', placeholder: ""/*, required: */
            					}
          				},
						{key: 'ipv4', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'ipv4', placeholder: ""/*, required: */
            					}
          				},
						{key: 'remote_as', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'remote_as', placeholder: ""/*, required: */
            					}
          				},
						{key: 'password', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'password', placeholder: ""/*, required: */
            					}
          				},
						{key: 'keepalive_time', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'keepalive_time', placeholder: ""/*, required: */
            					}
          				},
						{key: 'hold_time', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'hold_time', placeholder: ""/*, required: */
            					}
          				},
				];
}]);