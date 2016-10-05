'use strict';

angular.module('myApp.Clusters', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/clusters', {
    templateUrl: 'views/clusters/clusters.html',
    controller: 'ClustersCtrl'
  });
}])
.controller('ClustersCtrl',
		[ '$scope', 'apiClusters', '$location', 'currentClusters', '$timeout',
			function($scope, apiClusters, $location, currentClusters, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.Clusters = apiClusters.query();
				$scope.ClustersSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.ClustersGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'site', field:'site'/*, visible: */},
						{ name:'org', field:'org'/*, visible: */},
						{ name:'name', field:'name'/*, visible: */},
						{ name:'failover', field:'failover'/*, visible: */},
						{ name:'members', field:'members'/*, visible: */},
						{ name:'id', field:'id'/*, visible: */},
						{ name:'dcuplinks', field:'dcuplinks'/*, visible: */},
						{ name:'url', field:'url'/*, visible: */},
						{ name:'bgp_graceful_restart', field:'bgp_graceful_restart'/*, visible: */},
						{ name:'bgp_tep_community_type', field:'bgp_tep_community_type'/*, visible: */},
						{ name:'bgp_tep_community', field:'bgp_tep_community'/*, visible: */},
						{ name:'bgp_branch_community_type', field:'bgp_branch_community_type'/*, visible: */},
						{ name:'bgp_branch_community', field:'bgp_branch_community'/*, visible: */},
						{ name:'bgp_deployment_mode', field:'bgp_deployment_mode'/*, visible: */},
						{ name:'bgp_subnet_splitting', field:'bgp_subnet_splitting'/*, visible: */},
					],
					data: $scope.Clusters,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					apiClusters.save(newObject).$promise.then(function(data){
    						$scope.Clusters.push(data);
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
                			$scope.ClustersSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        			},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.ClustersSelected = undefined;
				}
				
				$scope.ClustersFields = [
						{key: 'site', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'site', placeholder: "site", required: false
            				}
          				},
						{key: 'org', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'org', placeholder: "org", required: false
            				}
          				},
						{key: 'name', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'name', placeholder: "cluster name", required: false
            				}
          				},
						{key: 'failover', type: 'input',
            				templateOptions: {
                				type: 'integer', label: 'failover', placeholder: "number of failover nodes in cluster", required: false
            				}
          				},
						{key: 'members', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'members', placeholder: "member nodes of cluster", required: false
            				}
          				},
						{key: 'id', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'id', placeholder: "id", required: false
            				}
          				},
						{key: 'dcuplinks', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'dcuplinks', placeholder: "dcuplinks of cluster", required: false
            				}
          				},
						{key: 'url', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'url', placeholder: "cluster etcd url", required: false
            				}
          				},
						{key: 'bgp_graceful_restart', type: 'input',
            				templateOptions: {
                				type: 'integer', label: 'bgp_graceful_restart', placeholder: "bgp_graceful_restart", required: false
            				}
          				},
						{key: 'bgp_tep_community_type', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'bgp_tep_community_type', placeholder: "bgp_tep_community_type", required: false
            				}
          				},
						{key: 'bgp_tep_community', type: 'input',
            				templateOptions: {
                				type: 'integer', label: 'bgp_tep_community', placeholder: "bgp_tep_community", required: false
            				}
          				},
						{key: 'bgp_branch_community_type', type: 'input',
            				templateOptions: {
                				type: 'integer', label: 'bgp_branch_community_type', placeholder: "bgp_branch_community_type", required: false
            				}
          				},
						{key: 'bgp_branch_community', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'bgp_branch_community', placeholder: "bgp_branch_community", required: false
            				}
          				},
						{key: 'bgp_deployment_mode', type: 'input',
            				templateOptions: {
                				type: 'integer', label: 'bgp_deployment_mode', placeholder: "bgp_deployment_mode", required: false
            				}
          				},
						{key: 'bgp_subnet_splitting', type: 'input',
            				templateOptions: {
                				type: 'integer', label: 'bgp_subnet_splitting', placeholder: "bgp_subnet_splitting", required: false
            				}
          				},
				];
		}]
)
;