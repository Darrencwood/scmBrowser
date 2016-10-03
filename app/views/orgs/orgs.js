'use strict';

angular.module('myApp.orgs', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/orgs', {
    templateUrl: 'views/orgs/orgs.html',
    controller: 'orgsCtrl'
  });
}])
.controller('orgsCtrl',
		[ '$scope', 'apiOrgs', '$location', 'currentOrgs', 
			function($scope, apiOrgs, $location, currentOrgs) {
				$scope.orgs = apiOrgs.query();
				$scope.orgsSelected = '';
				$scope.orgs.$promise.then(function(data){
					console.log(data);
				});
				$scope.orgsGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'city', field: 'city', visible:true },
						{ name:'contact', field: 'contact', visible:true },
						{ name:'country', field: 'country', visible:true },
						{ name:'gid', field: 'gid', visible:false },
						{ name:'id', field: 'id', visible:false },
						{ name:'longname', field: 'longname', visible:true },
						{ name:'name', field: 'name', visible:true },
						{ name:'realm', field: 'realm', visible:true },
						{ name:'street_address', field: 'street_address', visible:true },
						{ name:'timezone', field: 'timezone', visible:true },
						{ name:'uid', field: 'uid', visible:true },
					],
					data: $scope.orgs,
					rowTemplate: '<div ng-dblclick="grid.appScope.clickOrgs(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid, newObjects ) {
      			$scope.orgs = $scope.orgs.concat( newObjects );
      			console.log(newObjects);
    			},
    			importerObjectCallback: function ( grid, newObject ) {
    				apiOrgs.save(newObject);
    			},
    			onRegisterApi: function(gridApi){ 
      			$scope.gridApi = gridApi;
      			//$scope.gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
    			},
				};
  			     
				$scope.clickOrgs = function(row){ 
					//currentOrgs.setOrgs(row.entity.id);
					console.log(row);
					$scope.orgsSelected = row.entity;
				}
				
				$scope.isSelected = function() {
					return ($scope.orgsSelected === '')? false: true;
				}
				
				$scope.orgsFields = [
					{
            key: 'city', type: 'input',
            templateOptions: {
                type: 'text', label: 'city', placeholder: 'city', required: true
            }
          },
					{
            key: 'contact', type: 'input',
            templateOptions: {
                type: 'text', label: 'contact', placeholder: 'contact', required: true
            }
          },
					{
            key: 'country', type: 'input',
            templateOptions: {
                type: 'text', label: 'country', placeholder: 'country', required: true
            }
          },
					{
            key: 'gid', type: 'input',
            templateOptions: {
                type: 'text', label: 'gid', placeholder: 'gid', required: true
            }
          },
					{
            key: 'id', type: 'input',
            templateOptions: {
                type: 'text', label: 'id', placeholder: 'id', required: true
            }
          },
					{
            key: 'longname', type: 'input',
            templateOptions: {
                type: 'text', label: 'longname', placeholder: 'longname', required: true
            }
          },
					{
            key: 'name', type: 'input',
            templateOptions: {
                type: 'text', label: 'name', placeholder: 'name', required: true
            }
          },
					{
            key: 'realm', type: 'input',
            templateOptions: {
                type: 'text', label: 'realm', placeholder: 'realm', required: true
            }
          },
					{
            key: 'street_address', type: 'input',
            templateOptions: {
                type: 'text', label: 'street_address', placeholder: 'street_address', required: true
            }
          },
					{
            key: 'timezone', type: 'input',
            templateOptions: {
                type: 'text', label: 'timezone', placeholder: 'timezone', required: true
            }
          },
					{
            key: 'uid', type: 'input',
            templateOptions: {
                type: 'text', label: 'uid', placeholder: 'uid', required: true
            }
          },
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
