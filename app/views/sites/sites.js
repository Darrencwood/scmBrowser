'use strict';

angular.module('myApp.sites', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/sites', {
    templateUrl: 'views/sites/sites.html',
    controller: 'sitesCtrl'
  });
}])
.controller('sitesCtrl',
		[ '$scope', 'apiSites', '$location', 'currentSites', 
			function($scope, apiSites, $location, currentSites) {
				$scope.sites = apiSites.query();
				$scope.sitesSelected = '';
				$scope.sites.$promise.then(function(data){
					console.log(data);
				});
				$scope.sitesGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'city', field: 'city', visible:true },
						{ name:'country', field: 'country', visible:true },
						{ name:'longname', field: 'longname', visible:true },
						{ name:'name', field: 'name', visible:true },
						{ name:'networks', field: 'networks', visible:true },
						{ name:'org', field: 'org', visible:true },
						{ name:'size', field: 'size', visible:true },
						{ name:'street_address', field: 'street_address', visible:true },
						{ name:'timezone', field: 'timezone', visible:true },
						{ name:'uid', field: 'uid', visible:false },
						{ name:'uplinks', field: 'uplinks', visible:true },
					],
					data: $scope.sites,
					rowTemplate: '<div ng-dblclick="grid.appScope.clickSites(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid, newObjects ) {
      			$scope.sites = $scope.sites.concat( newObjects );
      			console.log(newObjects);
    			},
    			importerObjectCallback: function ( grid, newObject ) {
    				apiSites.save(newObject);
    			},
    			onRegisterApi: function(gridApi){ 
      			$scope.gridApi = gridApi;
      			//$scope.gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
    			},
				};
  			     
				$scope.clickSites = function(row){ 
					//currentSites.setSites(row.entity.id);
					console.log(row);
					$scope.sitesSelected = row.entity;
				}
				
				$scope.isSelected = function() {
					return ($scope.sitesSelected === '')? false: true;
				}
				
				$scope.sitesFields = [
					{
            key: 'city', type: 'input',
            templateOptions: {
                type: 'text', label: 'city', placeholder: 'city', required: true
            }
          },
					{
            key: 'country', type: 'input',
            templateOptions: {
                type: 'text', label: 'country', placeholder: 'country', required: true
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
            key: 'networks', type: 'input',
            templateOptions: {
                type: 'text', label: 'networks', placeholder: 'networks', required: true
            }
          },
					{
            key: 'org', type: 'input',
            templateOptions: {
                type: 'text', label: 'org', placeholder: 'org', required: true
            }
          },
					{
            key: 'size', type: 'input',
            templateOptions: {
                type: 'text', label: 'size', placeholder: 'size', required: true
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
					{
            key: 'uplinks', type: 'input',
            templateOptions: {
                type: 'text', label: 'uplinks', placeholder: 'uplinks', required: true
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
