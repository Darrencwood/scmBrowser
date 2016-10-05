'use strict';

angular.module('myApp.Bgpneighs', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/bgpneighs', {
    templateUrl: 'views/bgpneighs/bgpneighs.html',
    controller: 'BgpneighsCtrl'
  });
}])
.controller('BgpneighsCtrl',
		[ '$scope', 'apiBgpneighs', '$location', 'currentBgpneighs', '$timeout',
			function($scope, apiBgpneighs, $location, currentBgpneighs, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.Bgpneighs = apiBgpneighs.query();
				$scope.BgpneighsSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.BgpneighsGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'org', field:'org'/*, visible: */},
						{ name:'node', field:'node'/*, visible: */},
						{ name:'name', field:'name'/*, visible: */},
						{ name:'ipv4', field:'ipv4'/*, visible: */},
						{ name:'remote_as', field:'remote_as'/*, visible: */},
						{ name:'password', field:'password'/*, visible: */},
						{ name:'keepalive_time', field:'keepalive_time'/*, visible: */},
						{ name:'hold_time', field:'hold_time'/*, visible: */},
					],
					data: $scope.Bgpneighs,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					apiBgpneighs.save(newObject).$promise.then(function(data){
    						$scope.Bgpneighs.push(data);
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
                			$scope.BgpneighsSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        			},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.BgpneighsSelected = undefined;
				}
				
				$scope.BgpneighsFields = [
						{key: 'org', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'org', placeholder: "The ID of the organization this BGP neighbor belongs to.", required: false
            				}
          				},
						{key: 'node', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'node', placeholder: "The ID of the appliance this BGP neighbor belongs to.", required: false
            				}
          				},
						{key: 'name', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'name', placeholder: "The name of the BGP neighbor.", required: false
            				}
          				},
						{key: 'ipv4', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'ipv4', placeholder: "The IPv4 address of the BGP neighbor.", required: false
            				}
          				},
						{key: 'remote_as', type: 'input',
            				templateOptions: {
                				type: 'integer', label: 'remote_as', placeholder: "The remote autonomous system number (1 to 4294967295).", required: false
            				}
          				},
						{key: 'password', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'password', placeholder: "The router password.", required: false
            				}
          				},
						{key: 'keepalive_time', type: 'input',
            				templateOptions: {
                				type: 'integer', label: 'keepalive_time', placeholder: "The keep alive time in seconds (1 to 65535). Default value is 60.", required: false
            				}
          				},
						{key: 'hold_time', type: 'input',
            				templateOptions: {
                				type: 'integer', label: 'hold_time', placeholder: "The hold time in seconds (1. to 65535). Default value is 180.", required: false
            				}
          				},
				];
		}]
)
;