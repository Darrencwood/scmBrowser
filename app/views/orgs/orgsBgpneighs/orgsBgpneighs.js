'use strict';
angular.module('myApp.orgsBgpneighs', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/orgs/orgsBgpneighs', {
  	templateUrl: 'views/orgs/orgsBgpneighs/orgsBgpneighs.html',
    controller: 'orgsBgpneighsCtrl'
  });
}])
.controller('orgsBgpneighsCtrl',
		[ '$scope', 'orgsBgpneighsApi', '$location', 'orgsBgpneighsSelectionSvc', '$timeout',  'orgsSelectionSvc' , 
			function($scope, orgsBgpneighsApi, $location, orgsBgpneighsSelectionSvc, $timeout  , orgsSelectionSvc  ) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				let id = orgsSelectionSvc.getorgs();
				console.log(id);
				$scope.orgsBgpneighs = orgsBgpneighsApi.query({ orgid: id.id });
				
				$scope.orgsBgpneighsSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.orgsBgpneighsGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					rowHeight: 40,
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
					data: $scope.orgsBgpneighs,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					orgsBgpneighsApi.save({ orgid: id.id }, newObject).$promise.then(function(data){
    						$scope.orgsBgpneighs.push(data);
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
                					$scope.orgsBgpneighsSelected = row.entity;
							$scope.showSelectedRecord = true;
							console.log(row.entity);	
							orgsBgpneighsSelectionSvc.setorgsBgpneighs(row.entity);
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.orgsBgpneighsSelected = undefined;
				}
				
				$scope.orgsBgpneighsFields = [
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'node', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'node', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'name', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'name', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'ipv4', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'ipv4', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'remote_as', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'remote_as', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'password', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'password', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'keepalive_time', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'keepalive_time', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'hold_time', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'hold_time', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
				];
				console.log();
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
					
					var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent("org,node,name,ipv4,remote_as,password,keepalive_time,hold_time\n");
					var dlAnchorElem = document.getElementById('download');
					dlAnchorElem.setAttribute("href",     dataStr     );
					dlAnchorElem.setAttribute("download", "bgpneighs.csv");
							
				$scope.closeResults = function(){
					$scope.showUploadResults = false;
				};
}]);