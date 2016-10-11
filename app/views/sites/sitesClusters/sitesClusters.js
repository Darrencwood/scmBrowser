'use strict';
angular.module('myApp.sitesClusters', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/sites/sitesClusters', {
  	templateUrl: 'views/sites/sitesClusters/sitesClusters.html',
    controller: 'sitesClustersCtrl'
  });
}])
.controller('sitesClustersCtrl',
		[ '$scope', 'sitesClustersApi', '$location', 'sitesClustersSelectionSvc', '$timeout',  'sitesSelectionSvc' , 
			function($scope, sitesClustersApi, $location, sitesClustersSelectionSvc, $timeout  , sitesSelectionSvc  ) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				let id = sitesSelectionSvc.getsites();
				console.log(id);
				$scope.sitesClusters = sitesClustersApi.query({ siteid: id.id });
				
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
					rowHeight: 40,
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
    					sitesClustersApi.save({ siteid: id.id }, newObject).$promise.then(function(data){
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
							console.log(row.entity);	
							sitesClustersSelectionSvc.setsitesClusters(row.entity);
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
                					type: 'input', label: 'site', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'name', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'name', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'failover', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'failover', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'members', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'members', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'id', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'dcuplinks', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'dcuplinks', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'url', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'url', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'bgp_graceful_restart', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'bgp_graceful_restart', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'bgp_tep_community_type', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'bgp_tep_community_type', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'bgp_tep_community', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'bgp_tep_community', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'bgp_branch_community_type', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'bgp_branch_community_type', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'bgp_branch_community', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'bgp_branch_community', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'bgp_deployment_mode', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'bgp_deployment_mode', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'bgp_subnet_splitting', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'bgp_subnet_splitting', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
				];
}]);