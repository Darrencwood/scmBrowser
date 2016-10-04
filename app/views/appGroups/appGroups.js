'use strict';

angular.module('myApp.appGroups', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/appGroups', {
    templateUrl: 'views/appGroups/appGroups.html',
    controller: 'appGroupsCtrl'
  });
}])
.controller('appGroupsCtrl',
		[ '$scope', 'apiAppGroups', '$location', 'currentAppGroups', '$timeout',
			function($scope, apiAppGroups, $location, currentAppGroups, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.appGroups = apiAppGroups.query();
				$scope.appGroupsSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.appGroupsGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'apps', field:'apps', visible:true },
						{ name:'desc', field:'desc', visible:true },
						{ name:'name', field:'name', visible:true },
						{ name:'org', field:'org', visible:true },
						{ name:'predefined', field:'predefined', visible:true },
						{ name:'sapps', field:'sapps', visible:true },
						{ name:'webcat', field:'webcat', visible:true },
					],
					data: $scope.appGroups,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					apiAppGroups.save(newObject).$promise.then(function(data){
    						$scope.appGroups.push(data);
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
                			$scope.appGroupsSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        			},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.appGroupsSelected = undefined;
				}
				
				$scope.appGroupsFields = [
						{key: 'apps', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'apps', placeholder: 'apps', required: true
            				}
          				},
						{key: 'desc', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'desc', placeholder: 'desc', required: true
            				}
          				},
						{key: 'name', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'name', placeholder: 'name', required: true
            				}
          				},
						{key: 'org', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'org', placeholder: 'org', required: true
            				}
          				},
						{key: 'predefined', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'predefined', placeholder: 'predefined', required: true
            				}
          				},
						{key: 'sapps', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'sapps', placeholder: 'sapps', required: true
            				}
          				},
						{key: 'webcat', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'webcat', placeholder: 'webcat', required: true
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
		}]
)
;
