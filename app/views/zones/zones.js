'use strict';

angular.module('myApp.zones', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/zones', {
    templateUrl: 'views/zones/zones.html',
    controller: 'zonesCtrl'
  });
}])
.controller('zonesCtrl',
		[ '$scope', 'apiZones', '$location', 'currentZones', 
			function($scope, apiZones, $location, currentZones) {
				$scope.zones = apiZones.query();
				$scope.zonesSelected = '';
				$scope.zones.$promise.then(function(data){
					console.log(data);
				});
				$scope.zonesGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
					],
					data: $scope.zones,
					rowTemplate: '<div ng-dblclick="grid.appScope.clickZones(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid, newObjects ) {
      			$scope.zones = $scope.zones.concat( newObjects );
      			console.log(newObjects);
    			},
    			importerObjectCallback: function ( grid, newObject ) {
    				apiZones.save(newObject);
    			},
    			onRegisterApi: function(gridApi){ 
      			$scope.gridApi = gridApi;
      			//$scope.gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
    			},
				};
  			     
				$scope.clickZones = function(row){ 
					//currentZones.setZones(row.entity.id);
					console.log(row);
					$scope.zonesSelected = row.entity;
				}
				
				$scope.isSelected = function() {
					return ($scope.zonesSelected === '')? false: true;
				}
				
				$scope.zonesFields = [
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
