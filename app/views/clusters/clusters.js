'use strict';

angular.module('myApp.clusters', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/clusters', {
    templateUrl: 'views/clusters/clusters.html',
    controller: 'clustersCtrl'
  });
}])
.controller('clustersCtrl',
		[ '$scope', 'apiClusters', '$location', 'currentClusters', 
			function($scope, apiClusters, $location, currentClusters) {
				$scope.clusters = apiClusters.query();
				$scope.clustersSelected = '';
				$scope.clusters.$promise.then(function(data){
					console.log(data);
				});
				$scope.clustersGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
					],
					data: $scope.clusters,
					rowTemplate: '<div ng-dblclick="grid.appScope.clickClusters(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid, newObjects ) {
      			$scope.clusters = $scope.clusters.concat( newObjects );
      			console.log(newObjects);
    			},
    			importerObjectCallback: function ( grid, newObject ) {
    				apiClusters.save(newObject);
    			},
    			onRegisterApi: function(gridApi){ 
      			$scope.gridApi = gridApi;
      			//$scope.gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
    			},
				};
  			     
				$scope.clickClusters = function(row){ 
					//currentClusters.setClusters(row.entity.id);
					console.log(row);
					$scope.clustersSelected = row.entity;
				}
				
				$scope.isSelected = function() {
					return ($scope.clustersSelected === '')? false: true;
				}
				
				$scope.clustersFields = [
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
