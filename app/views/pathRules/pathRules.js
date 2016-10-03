'use strict';

angular.module('myApp.pathRules', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/pathRules', {
    templateUrl: 'views/pathRules/pathRules.html',
    controller: 'pathRulesCtrl'
  });
}])
.controller('pathRulesCtrl',
		[ '$scope', 'apiPathRules', '$location', 'currentPathRules', 
			function($scope, apiPathRules, $location, currentPathRules) {
				$scope.pathRules = apiPathRules.query();
				$scope.pathRulesSelected = '';
				$scope.pathRules.$promise.then(function(data){
					console.log(data);
				});
				$scope.pathRulesGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'active', field: 'active', visible:true },
						{ name:'apps', field: 'apps', visible:true },
						{ name:'devices', field: 'devices', visible:true },
						{ name:'dscp', field: 'dscp', visible:true },
						{ name:'dsttype', field: 'dsttype', visible:true },
						{ name:'marking', field: 'marking', visible:true },
						{ name:'org', field: 'org', visible:true },
						{ name:'path_preference', field: 'path_preference', visible:true },
						{ name:'qos', field: 'qos', visible:true },
						{ name:'sapps', field: 'sapps', visible:true },
						{ name:'sites', field: 'sites', visible:true },
						{ name:'srctype', field: 'srctype', visible:true },
						{ name:'tags', field: 'tags', visible:true },
						{ name:'uid', field: 'uid', visible:false },
						{ name:'users', field: 'users', visible:true },
						{ name:'zones', field: 'zones', visible:true },
					],
					data: $scope.pathRules,
					rowTemplate: '<div ng-dblclick="grid.appScope.clickPathRules(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid, newObjects ) {
      			$scope.pathRules = $scope.pathRules.concat( newObjects );
      			console.log(newObjects);
    			},
    			importerObjectCallback: function ( grid, newObject ) {
    				apiPathRules.save(newObject);
    			},
    			onRegisterApi: function(gridApi){ 
      			$scope.gridApi = gridApi;
      			//$scope.gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
    			},
				};
  			     
				$scope.clickPathRules = function(row){ 
					//currentPathRules.setPathRules(row.entity.id);
					console.log(row);
					$scope.pathRulesSelected = row.entity;
				}
				
				$scope.isSelected = function() {
					return ($scope.pathRulesSelected === '')? false: true;
				}
				
				$scope.pathRulesFields = [
					{
            key: 'active', type: 'input',
            templateOptions: {
                type: 'text', label: 'active', placeholder: 'active', required: true
            }
          },
					{
            key: 'apps', type: 'input',
            templateOptions: {
                type: 'text', label: 'apps', placeholder: 'apps', required: true
            }
          },
					{
            key: 'devices', type: 'input',
            templateOptions: {
                type: 'text', label: 'devices', placeholder: 'devices', required: true
            }
          },
					{
            key: 'dscp', type: 'input',
            templateOptions: {
                type: 'text', label: 'dscp', placeholder: 'dscp', required: true
            }
          },
					{
            key: 'dsttype', type: 'input',
            templateOptions: {
                type: 'text', label: 'dsttype', placeholder: 'dsttype', required: true
            }
          },
					{
            key: 'marking', type: 'input',
            templateOptions: {
                type: 'text', label: 'marking', placeholder: 'marking', required: true
            }
          },
					{
            key: 'org', type: 'input',
            templateOptions: {
                type: 'text', label: 'org', placeholder: 'org', required: true
            }
          },
					{
            key: 'path_preference', type: 'input',
            templateOptions: {
                type: 'text', label: 'path_preference', placeholder: 'path_preference', required: true
            }
          },
					{
            key: 'qos', type: 'input',
            templateOptions: {
                type: 'text', label: 'qos', placeholder: 'qos', required: true
            }
          },
					{
            key: 'sapps', type: 'input',
            templateOptions: {
                type: 'text', label: 'sapps', placeholder: 'sapps', required: true
            }
          },
					{
            key: 'sites', type: 'input',
            templateOptions: {
                type: 'text', label: 'sites', placeholder: 'sites', required: true
            }
          },
					{
            key: 'srctype', type: 'input',
            templateOptions: {
                type: 'text', label: 'srctype', placeholder: 'srctype', required: true
            }
          },
					{
            key: 'tags', type: 'input',
            templateOptions: {
                type: 'text', label: 'tags', placeholder: 'tags', required: true
            }
          },
					{
            key: 'uid', type: 'input',
            templateOptions: {
                type: 'text', label: 'uid', placeholder: 'uid', required: true
            }
          },
					{
            key: 'users', type: 'input',
            templateOptions: {
                type: 'text', label: 'users', placeholder: 'users', required: true
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
