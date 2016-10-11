'use strict';
angular.module('myApp.orgsApp_groups', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/orgs/orgsApp_groups', {
  	templateUrl: 'views/orgs/orgsApp_groups/orgsApp_groups.html',
    controller: 'orgsApp_groupsCtrl'
  });
}])
.controller('orgsApp_groupsCtrl',
		[ '$scope', 'orgsApp_groupsApi', '$location', 'orgsApp_groupsSelectionSvc', '$timeout',  'orgsSelectionSvc' , 
			function($scope, orgsApp_groupsApi, $location, orgsApp_groupsSelectionSvc, $timeout  , orgsSelectionSvc  ) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				let id = orgsSelectionSvc.getorgs();
				console.log(id);
				$scope.orgsApp_groups = orgsApp_groupsApi.query({ orgid: id.id });
				
				$scope.orgsApp_groupsSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.orgsApp_groupsGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					rowHeight: 40,
					columnDefs: [
						{ name:'Name', field:'name'/*, visible: */},
						{ name:'Webcat', field:'webcat'/*, visible: */},
						{ name:'Sapps', field:'sapps'/*, visible: */},
						{ name:'Org', field:'org'/*, visible: */},
						{ name:'Predefined', field:'predefined'/*, visible: */},
						{ name:'Apps', field:'apps'/*, visible: */},
						{ name:'Id', field:'id'/*, visible: */},
						{ name:'Desc', field:'desc'/*, visible: */},
					],
					data: $scope.orgsApp_groups,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					orgsApp_groupsApi.save({ orgid: id.id }, newObject).$promise.then(function(data){
    						$scope.orgsApp_groups.push(data);
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
                					$scope.orgsApp_groupsSelected = row.entity;
							$scope.showSelectedRecord = true;
							console.log(row.entity);	
							orgsApp_groupsSelectionSvc.setorgsApp_groups(row.entity);
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.orgsApp_groupsSelected = undefined;
				}
				
				$scope.orgsApp_groupsFields = [
						{key: 'name', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'name', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'webcat', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'webcat', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'sapps', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'sapps', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'predefined', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'predefined', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'apps', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'apps', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'id', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'desc', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'desc', placeholder: "", disabled: true/*, required: */ 
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
					
					var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent("name,webcat,sapps,org,predefined,apps,id,desc\n");
					var dlAnchorElem = document.getElementById('download');
					dlAnchorElem.setAttribute("href",     dataStr     );
					dlAnchorElem.setAttribute("download", "app_groups.csv");
							
				$scope.closeResults = function(){
					$scope.showUploadResults = false;
				};
}]);