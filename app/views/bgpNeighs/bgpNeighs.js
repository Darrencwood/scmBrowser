'use strict';

angular.module('myApp.bgpNeighs', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/bgpNeighs', {
    templateUrl: 'views/bgpNeighs/bgpNeighs.html',
    controller: 'bgpNeighsCtrl'
  });
}])
.controller('bgpNeighsCtrl',
		[ '$scope', 'apiBgpNeighs', '$location', 'currentBgpNeighs', 
			function($scope, apiBgpNeighs, $location, currentBgpNeighs) {
				$scope.bgpNeighs = apiBgpNeighs.query();
				$scope.bgpNeighsSelected = '';
				$scope.bgpNeighs.$promise.then(function(data){
					console.log(data);
				});
				$scope.bgpNeighsGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
					],
					data: $scope.bgpNeighs,
					rowTemplate: '<div ng-dblclick="grid.appScope.clickBgpNeighs(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid, newObjects ) {
      			$scope.bgpNeighs = $scope.bgpNeighs.concat( newObjects );
      			console.log(newObjects);
    			},
    			importerObjectCallback: function ( grid, newObject ) {
    				apiBgpNeighs.save(newObject);
    			},
    			onRegisterApi: function(gridApi){ 
      			$scope.gridApi = gridApi;
      			//$scope.gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
    			},
				};
  			     
				$scope.clickBgpNeighs = function(row){ 
					//currentBgpNeighs.setBgpNeighs(row.entity.id);
					console.log(row);
					$scope.bgpNeighsSelected = row.entity;
				}
				
				$scope.isSelected = function() {
					return ($scope.bgpNeighsSelected === '')? false: true;
				}
				
				$scope.bgpNeighsFields = [
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
