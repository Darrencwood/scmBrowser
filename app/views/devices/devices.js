'use strict';

angular.module('myApp.devices', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/devices', {
    templateUrl: 'views/devices/devices.html',
    controller: 'devicesCtrl'
  });
}])
.controller('devicesCtrl',
		[ '$scope', 'apiDevices', '$location', 'currentDevices', 
			function($scope, apiDevices, $location, currentDevices) {
				$scope.devices = apiDevices.query();
				$scope.devicesSelected = '';
				$scope.devices.$promise.then(function(data){
					console.log(data);
				});
				$scope.devicesGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'devgrp', field: 'devgrp', visible:true },
						{ name:'endpoint', field: 'endpoint', visible:true },
						{ name:'info', field: 'info', visible:true },
						{ name:'ipv4', field: 'ipv4', visible:true },
						{ name:'ipv6', field: 'ipv6', visible:true },
						{ name:'mac', field: 'mac', visible:true },
						{ name:'net', field: 'net', visible:true },
						{ name:'org', field: 'org', visible:true },
						{ name:'tags', field: 'tags', visible:true },
						{ name:'uid', field: 'uid', visible:false },
						{ name:'user', field: 'user', visible:true },
					],
					data: $scope.devices,
					rowTemplate: '<div ng-dblclick="grid.appScope.clickDevices(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid, newObjects ) {
      			$scope.devices = $scope.devices.concat( newObjects );
      			console.log(newObjects);
    			},
    			importerObjectCallback: function ( grid, newObject ) {
    				apiDevices.save(newObject);
    			},
    			onRegisterApi: function(gridApi){ 
      			$scope.gridApi = gridApi;
      			//$scope.gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
    			},
				};
  			     
				$scope.clickDevices = function(row){ 
					//currentDevices.setDevices(row.entity.id);
					console.log(row);
					$scope.devicesSelected = row.entity;
				}
				
				$scope.isSelected = function() {
					return ($scope.devicesSelected === '')? false: true;
				}
				
				$scope.devicesFields = [
					{
            key: 'devgrp', type: 'input',
            templateOptions: {
                type: 'text', label: 'devgrp', placeholder: 'devgrp', required: true
            }
          },
					{
            key: 'endpoint', type: 'input',
            templateOptions: {
                type: 'text', label: 'endpoint', placeholder: 'endpoint', required: true
            }
          },
					{
            key: 'info', type: 'input',
            templateOptions: {
                type: 'text', label: 'info', placeholder: 'info', required: true
            }
          },
					{
            key: 'ipv4', type: 'input',
            templateOptions: {
                type: 'text', label: 'ipv4', placeholder: 'ipv4', required: true
            }
          },
					{
            key: 'ipv6', type: 'input',
            templateOptions: {
                type: 'text', label: 'ipv6', placeholder: 'ipv6', required: true
            }
          },
					{
            key: 'mac', type: 'input',
            templateOptions: {
                type: 'text', label: 'mac', placeholder: 'mac', required: true
            }
          },
					{
            key: 'net', type: 'input',
            templateOptions: {
                type: 'text', label: 'net', placeholder: 'net', required: true
            }
          },
					{
            key: 'org', type: 'input',
            templateOptions: {
                type: 'text', label: 'org', placeholder: 'org', required: true
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
            key: 'user', type: 'input',
            templateOptions: {
                type: 'text', label: 'user', placeholder: 'user', required: true
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
