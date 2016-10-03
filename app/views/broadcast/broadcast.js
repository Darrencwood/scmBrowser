'use strict';

angular.module('myApp.broadcast', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/broadcast', {
    templateUrl: 'views/broadcast/broadcast.html',
    controller: 'broadcastCtrl'
  });
}])
.controller('broadcastCtrl',
		[ '$scope', 'apiBroadcasts', '$location', 'currentBroadcasts', 
			function($scope, apiBroadcasts, $location, currentBroadcasts) {
				$scope.broadcast = apiBroadcasts.query();
				$scope.broadcastSelected = '';
				$scope.broadcast.$promise.then(function(data){
					console.log(data);
				});
				$scope.broadcastGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
					],
					data: $scope.broadcast,
					rowTemplate: '<div ng-dblclick="grid.appScope.clickBroadcasts(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid, newObjects ) {
      			$scope.broadcast = $scope.broadcast.concat( newObjects );
      			console.log(newObjects);
    			},
    			importerObjectCallback: function ( grid, newObject ) {
    				apiBroadcasts.save(newObject);
    			},
    			onRegisterApi: function(gridApi){ 
      			$scope.gridApi = gridApi;
      			//$scope.gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
    			},
				};
  			     
				$scope.clickBroadcasts = function(row){ 
					//currentBroadcasts.setBroadcasts(row.entity.id);
					console.log(row);
					$scope.broadcastSelected = row.entity;
				}
				
				$scope.isSelected = function() {
					return ($scope.broadcastSelected === '')? false: true;
				}
				
				$scope.broadcastFields = [
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
