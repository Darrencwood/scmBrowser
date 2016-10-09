'use strict';
angular.module('myApp.sitesClusters', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/sitesClusters', {
    templateUrl: 'views/sitesClusters/sitesClusters.html',
    controller: 'sitesClustersCtrl'
  });
}])
.controller('sitesClustersCtrl',
		[ '$scope', 'sitesClustersApi', '$location', 'sitesClustersSelectionSvc', '$timeout',
			function($scope, sitesClustersApi, $location, sitesClustersSelectionSvc, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.sitesClusters = sitesClustersApi.query();
				$scope.sitesClustersSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.sitesClustersGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'Site', field:'site'/*, visible: */},
						{ name:'Org', field:'org'/*, visible: */},
						{ name:'Name', field:'name'/*, visible: */},
						{ name:'Failover', field:'failover'/*, visible: */},
						{ name:'Members', field:'members'/*, visible: */},
						{ name:'Id', field:'id'/*, visible: */},
						{ name:'Dcuplinks', field:'dcuplinks'/*, visible: */},
						{ name:'Url', field:'url'/*, visible: */},
						{ name:'Bgp Graceful Restart', field:'bgp_graceful_restart'/*, visible: */},
						{ name:'Bgp Tep Community Type', field:'bgp_tep_community_type'/*, visible: */},
						{ name:'Bgp Tep Community', field:'bgp_tep_community'/*, visible: */},
						{ name:'Bgp Branch Community Type', field:'bgp_branch_community_type'/*, visible: */},
						{ name:'Bgp Branch Community', field:'bgp_branch_community'/*, visible: */},
						{ name:'Bgp Deployment Mode', field:'bgp_deployment_mode'/*, visible: */},
						{ name:'Bgp Subnet Splitting', field:'bgp_subnet_splitting'/*, visible: */},
					],
					data: $scope.sitesClusters,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					sitesClustersApi.save(newObject).$promise.then(function(data){
    						$scope.sitesClusters.push(data);
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
                					$scope.sitesClustersSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.sitesClustersSelected = undefined;
				}
				
				$scope.sitesClustersFields = [
						{key: 'site', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'site', placeholder: ""/*, required: */
            					}
          				},
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: ""/*, required: */
            					}
          				},
						{key: 'name', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'name', placeholder: ""/*, required: */
            					}
          				},
						{key: 'failover', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'failover', placeholder: ""/*, required: */
            					}
          				},
						{key: 'members', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'members', placeholder: ""/*, required: */
            					}
          				},
						{key: 'id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'id', placeholder: ""/*, required: */
            					}
          				},
						{key: 'dcuplinks', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'dcuplinks', placeholder: ""/*, required: */
            					}
          				},
						{key: 'url', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'url', placeholder: ""/*, required: */
            					}
          				},
						{key: 'bgp_graceful_restart', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'bgp_graceful_restart', placeholder: ""/*, required: */
            					}
          				},
						{key: 'bgp_tep_community_type', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'bgp_tep_community_type', placeholder: ""/*, required: */
            					}
          				},
						{key: 'bgp_tep_community', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'bgp_tep_community', placeholder: ""/*, required: */
            					}
          				},
						{key: 'bgp_branch_community_type', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'bgp_branch_community_type', placeholder: ""/*, required: */
            					}
          				},
						{key: 'bgp_branch_community', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'bgp_branch_community', placeholder: ""/*, required: */
            					}
          				},
						{key: 'bgp_deployment_mode', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'bgp_deployment_mode', placeholder: ""/*, required: */
            					}
          				},
						{key: 'bgp_subnet_splitting', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'bgp_subnet_splitting', placeholder: ""/*, required: */
            					}
          				},
				];
}]);