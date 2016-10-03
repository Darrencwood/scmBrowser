'use strict';

angular.module('myApp.appGroups', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/appGroups', {
    templateUrl: 'views/appGroups/appGroups.html',
    controller: 'appGroupsCtrl'
  });
}])
.controller('appGroupsCtrl',
		[ '$scope', 'apiAppGroups', '$location', 'currentAppGroups', 
			function($scope, apiAppGroups, $location, currentAppGroups) {
				$scope.appGroups = apiAppGroups.query();
				$scope.appGroupsSelected = '';
				$scope.appGroups.$promise.then(function(data){
					console.log(data);
				});
				$scope.appGroupsGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'apps', field: 'apps', visible:true },
						{ name:'desc', field: 'desc', visible:true },
						{ name:'name', field: 'name', visible:true },
						{ name:'org', field: 'org', visible:true },
						{ name:'predefined', field: 'predefined', visible:true },
						{ name:'sapps', field: 'sapps', visible:true },
						{ name:'webcat', field: 'webcat', visible:true },
					],
					data: $scope.appGroups,
					rowTemplate: '<div ng-dblclick="grid.appScope.clickAppGroups(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid, newObjects ) {
      			$scope.appGroups = $scope.appGroups.concat( newObjects );
      			console.log(newObjects);
    			},
    			importerObjectCallback: function ( grid, newObject ) {
    				apiAppGroups.save(newObject);
    			},
    			onRegisterApi: function(gridApi){ 
      			$scope.gridApi = gridApi;
      			//$scope.gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
    			},
				};
  			     
				$scope.clickAppGroups = function(row){ 
					//currentAppGroups.setAppGroups(row.entity.id);
					console.log(row);
					$scope.appGroupsSelected = row.entity;
				}
				
				$scope.isSelected = function() {
					return ($scope.appGroupsSelected === '')? false: true;
				}
				
				$scope.appGroupsFields = [
					{
            key: 'apps', type: 'input',
            templateOptions: {
                type: 'text', label: 'apps', placeholder: 'apps', required: true
            }
          },
					{
            key: 'desc', type: 'input',
            templateOptions: {
                type: 'text', label: 'desc', placeholder: 'desc', required: true
            }
          },
					{
            key: 'name', type: 'input',
            templateOptions: {
                type: 'text', label: 'name', placeholder: 'name', required: true
            }
          },
					{
            key: 'org', type: 'input',
            templateOptions: {
                type: 'text', label: 'org', placeholder: 'org', required: true
            }
          },
					{
            key: 'predefined', type: 'input',
            templateOptions: {
                type: 'text', label: 'predefined', placeholder: 'predefined', required: true
            }
          },
					{
            key: 'sapps', type: 'input',
            templateOptions: {
                type: 'text', label: 'sapps', placeholder: 'sapps', required: true
            }
          },
					{
            key: 'webcat', type: 'input',
            templateOptions: {
                type: 'text', label: 'webcat', placeholder: 'webcat', required: true
            }
          },
				];
				
				var uploadZone = document.getElementById('upload');

    		// Optional.   Show the copy icon when dragging over.  Seems to only work for chrome.
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
    		    $scope.gridApi.importer.importFile(files[0]);
					}
				);
		}]
);
