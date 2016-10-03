'use strict';

angular.module('myApp.dcInterfaces', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dcInterfaces', {
    templateUrl: 'views/dcInterfaces/dcInterfaces.html',
    controller: 'dcInterfacesCtrl'
  });
}])
.controller('dcInterfacesCtrl',
		[ '$scope', 'apiDCInterfaces', '$location', 'currentDCInterfaces', 
			function($scope, apiDCInterfaces, $location, currentDCInterfaces) {
				$scope.dcInterfaces = apiDCInterfaces.query();
				$scope.dcInterfacesSelected = '';
				$scope.dcInterfaces.$promise.then(function(data){
					console.log(data);
				});
				$scope.dcInterfacesGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
					],
					data: $scope.dcInterfaces,
					rowTemplate: '<div ng-dblclick="grid.appScope.clickDCInterfaces(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid, newObjects ) {
      			$scope.dcInterfaces = $scope.dcInterfaces.concat( newObjects );
      			console.log(newObjects);
    			},
    			importerObjectCallback: function ( grid, newObject ) {
    				apiDCInterfaces.save(newObject);
    			},
    			onRegisterApi: function(gridApi){ 
      			$scope.gridApi = gridApi;
      			//$scope.gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
    			},
				};
  			     
				$scope.clickDCInterfaces = function(row){ 
					//currentDCInterfaces.setDCInterfaces(row.entity.id);
					console.log(row);
					$scope.dcInterfacesSelected = row.entity;
				}
				
				$scope.isSelected = function() {
					return ($scope.dcInterfacesSelected === '')? false: true;
				}
				
				$scope.dcInterfacesFields = [
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
