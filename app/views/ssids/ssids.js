'use strict';

angular.module('myApp.ssids', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/ssids', {
    templateUrl: 'views/ssids/ssids.html',
    controller: 'ssidsCtrl'
  });
}])
.controller('ssidsCtrl',
		[ '$scope', 'apiSsids', '$location', 'currentSsids', 
			function($scope, apiSsids, $location, currentSsids) {
				$scope.ssids = apiSsids.query();
				$scope.ssidsSelected = '';
				$scope.ssids.$promise.then(function(data){
					console.log(data);
				});
				$scope.ssidsGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
					],
					data: $scope.ssids,
					rowTemplate: '<div ng-dblclick="grid.appScope.clickSsids(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid, newObjects ) {
      			$scope.ssids = $scope.ssids.concat( newObjects );
      			console.log(newObjects);
    			},
    			importerObjectCallback: function ( grid, newObject ) {
    				apiSsids.save(newObject);
    			},
    			onRegisterApi: function(gridApi){ 
      			$scope.gridApi = gridApi;
      			//$scope.gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
    			},
				};
  			     
				$scope.clickSsids = function(row){ 
					//currentSsids.setSsids(row.entity.id);
					console.log(row);
					$scope.ssidsSelected = row.entity;
				}
				
				$scope.isSelected = function() {
					return ($scope.ssidsSelected === '')? false: true;
				}
				
				$scope.ssidsFields = [
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
