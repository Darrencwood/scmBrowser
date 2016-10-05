'use strict';

angular.module('myApp.Dcuplinks', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dcuplinks', {
    templateUrl: 'views/dcuplinks/dcuplinks.html',
    controller: 'DcuplinksCtrl'
  });
}])
.controller('DcuplinksCtrl',
		[ '$scope', 'apiDcuplinks', '$location', 'currentDcuplinks', '$timeout',
			function($scope, apiDcuplinks, $location, currentDcuplinks, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.Dcuplinks = apiDcuplinks.query();
				$scope.DcuplinksSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.DcuplinksGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'org', field:'org'/*, visible: */},
						{ name:'net', field:'net'/*, visible: */},
						{ name:'public_ipv4', field:'public_ipv4'/*, visible: */},
						{ name:'public_ipv6', field:'public_ipv6'/*, visible: */},
						{ name:'nat_range_start', field:'nat_range_start'/*, visible: */},
						{ name:'wan', field:'wan'/*, visible: */},
						{ name:'cluster', field:'cluster'/*, visible: */},
						{ name:'tags', field:'tags'/*, visible: */},
					],
					data: $scope.Dcuplinks,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					apiDcuplinks.save(newObject).$promise.then(function(data){
    						$scope.Dcuplinks.push(data);
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
                			$scope.DcuplinksSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        			},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.DcuplinksSelected = undefined;
				}
				
				$scope.DcuplinksFields = [
						{key: 'org', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'org', placeholder: "org", required: false
            				}
          				},
						{key: 'net', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'net', placeholder: "TEP IPs", required: false
            				}
          				},
						{key: 'public_ipv4', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'public_ipv4', placeholder: "public ipv4", required: false
            				}
          				},
						{key: 'public_ipv6', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'public_ipv6', placeholder: "public ipv6", required: false
            				}
          				},
						{key: 'nat_range_start', type: 'input',
            				templateOptions: {
                				type: 'integer', label: 'nat_range_start', placeholder: "nat range start port", required: false
            				}
          				},
						{key: 'wan', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'wan', placeholder: "wan", required: false
            				}
          				},
						{key: 'cluster', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'cluster', placeholder: "cluster", required: false
            				}
          				},
						{key: 'tags', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'tags', placeholder: "carrier tags", required: false
            				}
          				},
				];
		}]
)
;