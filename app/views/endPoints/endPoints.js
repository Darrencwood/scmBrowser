'use strict';

angular.module('myApp.endPoints', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/endPoints', {
    templateUrl: 'views/endPoints/endPoints.html',
    controller: 'endPointsCtrl'
  });
}])
.controller('endPointsCtrl',
		[ '$scope', 'apiEndPoints', '$location', 'currentEndPoints', 
			function($scope, apiEndPoints, $location, currentEndPoints) {
				$scope.endPoints = apiEndPoints.query();
				$scope.endPointsSelected = '';
				$scope.endPoints.$promise.then(function(data){
					console.log(data);
				});
				$scope.endPointsGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
					],
					data: $scope.endPoints,
					rowTemplate: '<div ng-dblclick="grid.appScope.clickEndPoints(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid, newObjects ) {
      			$scope.endPoints = $scope.endPoints.concat( newObjects );
      			console.log(newObjects);
    			},
    			importerObjectCallback: function ( grid, newObject ) {
    				apiEndPoints.save(newObject);
    			},
    			onRegisterApi: function(gridApi){ 
      			$scope.gridApi = gridApi;
      			//$scope.gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
    			},
				};
  			     
				$scope.clickEndPoints = function(row){ 
					//currentEndPoints.setEndPoints(row.entity.id);
					console.log(row);
					$scope.endPointsSelected = row.entity;
				}
				
				$scope.isSelected = function() {
					return ($scope.endPointsSelected === '')? false: true;
				}
				
				$scope.endPointsFields = [
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
