'use strict';
angular.module('myApp.orgsApp_groups', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/orgsApp_groups', {
    templateUrl: 'views/orgsApp_groups/orgsApp_groups.html',
    controller: 'orgsApp_groupsCtrl'
  });
}])
.controller('orgsApp_groupsCtrl',
		[ '$scope', 'orgsApp_groupsApi', '$location', 'orgsApp_groupsSelectionSvc', '$timeout',
			function($scope, orgsApp_groupsApi, $location, orgsApp_groupsSelectionSvc, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.orgsApp_groups = orgsApp_groupsApi.query();
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
    					orgsApp_groupsApi.save(newObject).$promise.then(function(data){
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
                					type: 'input', label: 'name', placeholder: ""/*, required: */
            					}
          				},
						{key: 'webcat', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'webcat', placeholder: ""/*, required: */
            					}
          				},
						{key: 'sapps', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'sapps', placeholder: ""/*, required: */
            					}
          				},
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: ""/*, required: */
            					}
          				},
						{key: 'predefined', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'predefined', placeholder: ""/*, required: */
            					}
          				},
						{key: 'apps', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'apps', placeholder: ""/*, required: */
            					}
          				},
						{key: 'id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'id', placeholder: ""/*, required: */
            					}
          				},
						{key: 'desc', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'desc', placeholder: ""/*, required: */
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
								
				var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent("name,webcat,sapps,org,predefined,apps,id,desc\n");
				var dlAnchorElem = document.getElementById('download');
				dlAnchorElem.setAttribute("href",     dataStr     );
				dlAnchorElem.setAttribute("download", "org.csv");
				
				$scope.closeResults = function(){
					$scope.showUploadResults = false;
				};
}]);