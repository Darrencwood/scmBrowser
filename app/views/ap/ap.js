'use strict';

angular.module('myApp.ap', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/ap', {
    templateUrl: 'views/ap/ap.html',
    controller: 'apCtrl'
  });
}])
.controller('apCtrl',
		[ '$scope', 'apiAp', '$location', 'currentAp', 
			function($scope, apiAp, $location, currentAp) {
				$scope.ap = apiAp.query();
				$scope.apSelected = '';
				$scope.ap.$promise.then(function(data){
					console.log(data);
				});
				$scope.apGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
					],
					data: $scope.ap,
					rowTemplate: '<div ng-dblclick="grid.appScope.clickAp(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid, newObjects ) {
      			$scope.ap = $scope.ap.concat( newObjects );
      			console.log(newObjects);
    			},
    			importerObjectCallback: function ( grid, newObject ) {
    				apiAp.save(newObject);
    			},
    			onRegisterApi: function(gridApi){ 
      			$scope.gridApi = gridApi;
      			//$scope.gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
    			},
				};
  			     
				$scope.clickAp = function(row){ 
					//currentAp.setAp(row.entity.id);
					console.log(row);
					$scope.apSelected = row.entity;
				}
				
				$scope.isSelected = function() {
					return ($scope.apSelected === '')? false: true;
				}
				
				$scope.apFields = [
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
