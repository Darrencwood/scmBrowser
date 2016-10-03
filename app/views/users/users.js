'use strict';

angular.module('myApp.users', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/users', {
    templateUrl: 'views/users/users.html',
    controller: 'usersCtrl'
  });
}])
.controller('usersCtrl',
		[ '$scope', 'apiUsers', '$location', 'currentUsers', 
			function($scope, apiUsers, $location, currentUsers) {
				$scope.users = apiUsers.query();
				$scope.usersSelected = '';
				$scope.users.$promise.then(function(data){
					console.log(data);
				});
				$scope.usersGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
					],
					data: $scope.users,
					rowTemplate: '<div ng-dblclick="grid.appScope.clickUsers(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid, newObjects ) {
      			$scope.users = $scope.users.concat( newObjects );
      			console.log(newObjects);
    			},
    			importerObjectCallback: function ( grid, newObject ) {
    				apiUsers.save(newObject);
    			},
    			onRegisterApi: function(gridApi){ 
      			$scope.gridApi = gridApi;
      			//$scope.gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
    			},
				};
  			     
				$scope.clickUsers = function(row){ 
					//currentUsers.setUsers(row.entity.id);
					console.log(row);
					$scope.usersSelected = row.entity;
				}
				
				$scope.isSelected = function() {
					return ($scope.usersSelected === '')? false: true;
				}
				
				$scope.usersFields = [
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
