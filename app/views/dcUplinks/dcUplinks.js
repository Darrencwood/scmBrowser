'use strict';

angular.module('myApp.dcUplinks', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dcUplinks', {
    templateUrl: 'views/dcUplinks/dcUplinks.html',
    controller: 'dcUplinksCtrl'
  });
}])
.controller('dcUplinksCtrl',
		[ '$scope', 'apiDCUplinks', '$location', 'currentDCUplinks', 
			function($scope, apiDCUplinks, $location, currentDCUplinks) {
				$scope.dcUplinks = apiDCUplinks.query();
				$scope.dcUplinksSelected = '';
				$scope.dcUplinks.$promise.then(function(data){
					console.log(data);
				});
				$scope.dcUplinksGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
					],
					data: $scope.dcUplinks,
					rowTemplate: '<div ng-dblclick="grid.appScope.clickDCUplinks(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid, newObjects ) {
      			$scope.dcUplinks = $scope.dcUplinks.concat( newObjects );
      			console.log(newObjects);
    			},
    			importerObjectCallback: function ( grid, newObject ) {
    				apiDCUplinks.save(newObject);
    			},
    			onRegisterApi: function(gridApi){ 
      			$scope.gridApi = gridApi;
      			//$scope.gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
    			},
				};
  			     
				$scope.clickDCUplinks = function(row){ 
					//currentDCUplinks.setDCUplinks(row.entity.id);
					console.log(row);
					$scope.dcUplinksSelected = row.entity;
				}
				
				$scope.isSelected = function() {
					return ($scope.dcUplinksSelected === '')? false: true;
				}
				
				$scope.dcUplinksFields = [
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
