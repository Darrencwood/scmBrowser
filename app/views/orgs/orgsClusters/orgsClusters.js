'use strict';
angular.module('myApp.orgsClusters', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/orgsClusters', {
    templateUrl: 'views/orgsClusters/orgsClusters.html',
    controller: 'orgsClustersCtrl'
  });
}])
.controller('orgsClustersCtrl',
		[ '$scope', 'orgsClustersApi', '$location', 'orgsClustersSelectionSvc', '$timeout',
			function($scope, orgsClustersApi, $location, orgsClustersSelectionSvc, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.orgsClusters = orgsClustersApi.query();
				$scope.orgsClustersSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.orgsClustersGridOptions = {
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
					data: $scope.orgsClusters,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					orgsClustersApi.save(newObject).$promise.then(function(data){
    						$scope.orgsClusters.push(data);
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
                					$scope.orgsClustersSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.orgsClustersSelected = undefined;
				}
				
				$scope.orgsClustersFields = [
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
				var uploadZone = document.getElementById('upload');

    			// Optional.   Show the copy icon when dragging over.  Seems to
    			// only work for chrome.
    			uploadZone.addEventListener('dragover', function(e) {
    		    	e.stopPropagation();
    		    	e.preventDefault();
    		    	e.dataTransfer.dropEffect = 'copy';
    			});
		
    			// Get file data on drop
    			uploadZone.addEventListener('drop', function(e) {
    		    	e.stopPropagation();
    		    	e.preventDefault();
    		    	var files = e.dataTransfer.files; // Array of all files
    		    	$scope.updateResults =[];
    		    	$scope.showUploadResults = true;
    		    	$scope.gridApi.importer.importFile(files[0]);
				});
								
				var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent("site,org,name,failover,members,dcuplinks,url,bgp_graceful_restart,bgp_tep_community_type,bgp_tep_community,bgp_branch_community_type,bgp_branch_community,bgp_deployment_mode,bgp_subnet_splitting\n");
				var dlAnchorElem = document.getElementById('download');
				dlAnchorElem.setAttribute("href",     dataStr     );
				dlAnchorElem.setAttribute("download", "org.csv");
				
				$scope.closeResults = function(){
					$scope.showUploadResults = false;
				};
}]);