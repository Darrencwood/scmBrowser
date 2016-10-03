'use strict';

angular.module('myApp.switches', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/switches', {
    templateUrl: 'views/switches/switches.html',
    controller: 'switchesCtrl'
  });
}])
.controller('switchesCtrl',
		[ '$scope', 'apiSwitches', '$location', 'currentSwitches', 
			function($scope, apiSwitches, $location, currentSwitches) {
				$scope.switches = apiSwitches.query();
				$scope.switchesSelected = '';
				$scope.switches.$promise.then(function(data){
					console.log(data);
				});
				$scope.switchesGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
					],
					data: $scope.switches,
					rowTemplate: '<div ng-dblclick="grid.appScope.clickSwitches(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid, newObjects ) {
      			$scope.switches = $scope.switches.concat( newObjects );
      			console.log(newObjects);
    			},
    			importerObjectCallback: function ( grid, newObject ) {
    				apiSwitches.save(newObject);
    			},
    			onRegisterApi: function(gridApi){ 
      			$scope.gridApi = gridApi;
      			//$scope.gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
    			},
				};
  			     
				$scope.clickSwitches = function(row){ 
					//currentSwitches.setSwitches(row.entity.id);
					console.log(row);
					$scope.switchesSelected = row.entity;
				}
				
				$scope.isSelected = function() {
					return ($scope.switchesSelected === '')? false: true;
				}
				
				$scope.switchesFields = [
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
