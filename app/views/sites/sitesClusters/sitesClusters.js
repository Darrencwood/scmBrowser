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
					enableSelectAll: true,
					exporterMenuPdf: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					exporterCsvFilename: 'clusters.csv',
					exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
					rowHeight: 40,
					columnDefs: [
					{ name: 'delete',
					  cellTemplate: '<a id="delete" class="btn btn-danger" role="button" ng-click="grid.appScope.deleteRow(row)"> <span class="glyphicon glyphicon-trash"></span></a>'
					},
						{ name:'Site', field:'site'/*, visible: */, enableCellEdit: ('site'=='id' || 'site'=='uid' || 'site'=='gid')? false: true},
						{ name:'Org', field:'org'/*, visible: */, enableCellEdit: ('org'=='id' || 'org'=='uid' || 'org'=='gid')? false: true},
						{ name:'Name', field:'name'/*, visible: */, enableCellEdit: ('name'=='id' || 'name'=='uid' || 'name'=='gid')? false: true},
						{ name:'Failover', field:'failover'/*, visible: */, enableCellEdit: ('failover'=='id' || 'failover'=='uid' || 'failover'=='gid')? false: true},
						{ name:'Members', field:'members'/*, visible: */, enableCellEdit: ('members'=='id' || 'members'=='uid' || 'members'=='gid')? false: true},
						{ name:'Id', field:'id'/*, visible: */, enableCellEdit: ('id'=='id' || 'id'=='uid' || 'id'=='gid')? false: true},
						{ name:'Dcuplinks', field:'dcuplinks'/*, visible: */, enableCellEdit: ('dcuplinks'=='id' || 'dcuplinks'=='uid' || 'dcuplinks'=='gid')? false: true},
						{ name:'Url', field:'url'/*, visible: */, enableCellEdit: ('url'=='id' || 'url'=='uid' || 'url'=='gid')? false: true},
						{ name:'Bgp Graceful Restart', field:'bgp_graceful_restart'/*, visible: */, enableCellEdit: ('bgp_graceful_restart'=='id' || 'bgp_graceful_restart'=='uid' || 'bgp_graceful_restart'=='gid')? false: true},
						{ name:'Bgp Tep Community Type', field:'bgp_tep_community_type'/*, visible: */, enableCellEdit: ('bgp_tep_community_type'=='id' || 'bgp_tep_community_type'=='uid' || 'bgp_tep_community_type'=='gid')? false: true},
						{ name:'Bgp Tep Community', field:'bgp_tep_community'/*, visible: */, enableCellEdit: ('bgp_tep_community'=='id' || 'bgp_tep_community'=='uid' || 'bgp_tep_community'=='gid')? false: true},
						{ name:'Bgp Branch Community Type', field:'bgp_branch_community_type'/*, visible: */, enableCellEdit: ('bgp_branch_community_type'=='id' || 'bgp_branch_community_type'=='uid' || 'bgp_branch_community_type'=='gid')? false: true},
						{ name:'Bgp Branch Community', field:'bgp_branch_community'/*, visible: */, enableCellEdit: ('bgp_branch_community'=='id' || 'bgp_branch_community'=='uid' || 'bgp_branch_community'=='gid')? false: true},
						{ name:'Bgp Deployment Mode', field:'bgp_deployment_mode'/*, visible: */, enableCellEdit: ('bgp_deployment_mode'=='id' || 'bgp_deployment_mode'=='uid' || 'bgp_deployment_mode'=='gid')? false: true},
						{ name:'Bgp Subnet Splitting', field:'bgp_subnet_splitting'/*, visible: */, enableCellEdit: ('bgp_subnet_splitting'=='id' || 'bgp_subnet_splitting'=='uid' || 'bgp_subnet_splitting'=='gid')? false: true},
					],
					data: $scope.sitesClusters,
						rowTemplate: '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
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
      					gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
            				console.log('edited row id:' + rowEntity.id + ' Column:' + colDef.name + ' newValue:' + newValue + ' oldValue:' + oldValue);
            				console.log(rowEntity);
            				let req = { };
							req['clusterid'] = rowEntity.id;
            				sitesClustersApi.update(req, rowEntity).$promise.then(function(success){
            					// Do nothing , we already updated the table.
            				}, function(error){
            					// TODO: Rollback change.
            				});
          				});
    					}
				};
  			     
				$scope.click = function(row){ 
					$scope.clicked = $timeout(function(){
						if ($scope.stopped == false){
                					$scope.sitesClustersSelected = row.entity;
							$scope.showSelectedRecord = true;
							//console.log(row.entity);	
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
				
				$scope.deleteRow = function(row) {
					$scope.stopped = $timeout.cancel($scope.clicked);
					console.log('Deleting ' + row.entity.id);	
					let req = { };
					req['clusterid'] = row.entity.id;
					sitesClustersApi.delete(req).$promise.then(function(success){
						for (let i=0; i<$scope.sitesClusters.length; i++){
							if ($scope.sitesClusters[i].id == row.entity.id) {
								$scope.sitesClusters.splice(i, 1);
								refresh();
								break;
							}
						}
					}, function(error){
						console.log(error);
					});

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