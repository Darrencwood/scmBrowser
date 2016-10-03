'use strict';

angular.module('myApp.nodes', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/nodes', {
    templateUrl: 'views/nodes/nodes.html',
    controller: 'nodesCtrl'
  });
}])
.controller('nodesCtrl',
		[ '$scope', 'apiNodes', '$location', 'currentNodes', 
			function($scope, apiNodes, $location, currentNodes) {
				$scope.nodes = apiNodes.query();
				$scope.nodesSelected = '';
				$scope.nodes.$promise.then(function(data){
					console.log(data);
				});
				$scope.nodesGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'disable_stp', field: 'disable_stp', visible:true },
						{ name:'inventory_version_cc', field: 'inventory_version_cc', visible:true },
						{ name:'license', field: 'license', visible:true },
						{ name:'local_as', field: 'local_as', visible:true },
						{ name:'location', field: 'location', visible:true },
						{ name:'model', field: 'model', visible:true },
						{ name:'org', field: 'org', visible:true },
						{ name:'ports', field: 'ports', visible:true },
						{ name:'radios', field: 'radios', visible:true },
						{ name:'realm', field: 'realm', visible:true },
						{ name:'router_id', field: 'router_id', visible:true },
						{ name:'serial', field: 'serial', visible:true },
						{ name:'simulated', field: 'simulated', visible:true },
						{ name:'site', field: 'site', visible:true },
						{ name:'sitelink', field: 'sitelink', visible:true },
						{ name:'uid', field: 'uid', visible:false },
						{ name:'uplinks', field: 'uplinks', visible:true },
						{ name:'zones', field: 'zones', visible:true },
					],
					data: $scope.nodes,
					rowTemplate: '<div ng-dblclick="grid.appScope.clickNodes(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid, newObjects ) {
      			$scope.nodes = $scope.nodes.concat( newObjects );
      			console.log(newObjects);
    			},
    			importerObjectCallback: function ( grid, newObject ) {
    				apiNodes.save(newObject);
    			},
    			onRegisterApi: function(gridApi){ 
      			$scope.gridApi = gridApi;
      			//$scope.gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
    			},
				};
  			     
				$scope.clickNodes = function(row){ 
					//currentNodes.setNodes(row.entity.id);
					console.log(row);
					$scope.nodesSelected = row.entity;
				}
				
				$scope.isSelected = function() {
					return ($scope.nodesSelected === '')? false: true;
				}
				
				$scope.nodesFields = [
					{
            key: 'disable_stp', type: 'input',
            templateOptions: {
                type: 'text', label: 'disable_stp', placeholder: 'disable_stp', required: true
            }
          },
					{
            key: 'inventory_version_cc', type: 'input',
            templateOptions: {
                type: 'text', label: 'inventory_version_cc', placeholder: 'inventory_version_cc', required: true
            }
          },
					{
            key: 'license', type: 'input',
            templateOptions: {
                type: 'text', label: 'license', placeholder: 'license', required: true
            }
          },
					{
            key: 'local_as', type: 'input',
            templateOptions: {
                type: 'text', label: 'local_as', placeholder: 'local_as', required: true
            }
          },
					{
            key: 'location', type: 'input',
            templateOptions: {
                type: 'text', label: 'location', placeholder: 'location', required: true
            }
          },
					{
            key: 'model', type: 'input',
            templateOptions: {
                type: 'text', label: 'model', placeholder: 'model', required: true
            }
          },
					{
            key: 'org', type: 'input',
            templateOptions: {
                type: 'text', label: 'org', placeholder: 'org', required: true
            }
          },
					{
            key: 'ports', type: 'input',
            templateOptions: {
                type: 'text', label: 'ports', placeholder: 'ports', required: true
            }
          },
					{
            key: 'radios', type: 'input',
            templateOptions: {
                type: 'text', label: 'radios', placeholder: 'radios', required: true
            }
          },
					{
            key: 'realm', type: 'input',
            templateOptions: {
                type: 'text', label: 'realm', placeholder: 'realm', required: true
            }
          },
					{
            key: 'router_id', type: 'input',
            templateOptions: {
                type: 'text', label: 'router_id', placeholder: 'router_id', required: true
            }
          },
					{
            key: 'serial', type: 'input',
            templateOptions: {
                type: 'text', label: 'serial', placeholder: 'serial', required: true
            }
          },
					{
            key: 'simulated', type: 'input',
            templateOptions: {
                type: 'text', label: 'simulated', placeholder: 'simulated', required: true
            }
          },
					{
            key: 'site', type: 'input',
            templateOptions: {
                type: 'text', label: 'site', placeholder: 'site', required: true
            }
          },
					{
            key: 'sitelink', type: 'input',
            templateOptions: {
                type: 'text', label: 'sitelink', placeholder: 'sitelink', required: true
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
					{
            key: 'zones', type: 'input',
            templateOptions: {
                type: 'text', label: 'zones', placeholder: 'zones', required: true
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
