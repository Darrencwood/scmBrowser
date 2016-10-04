'use strict';

angular.module('myApp.customApps', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/customApps', {
    templateUrl: 'views/customApps/customApps.html',
    controller: 'customAppsCtrl'
  });
}])
.controller('customAppsCtrl',
		[ '$scope', 'apiCustomApps', '$location', 'currentCustomApps', '$timeout',
			function($scope, apiCustomApps, $location, currentCustomApps, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.customApps = apiCustomApps.query();
				$scope.customAppsSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.customAppsGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'appgrps', field:'appgrps', visible:true },
						{ name:'appid', field:'appid', visible:true },
						{ name:'desc', field:'desc', visible:true },
						{ name:'devgrp', field:'devgrp', visible:true },
						{ name:'device', field:'device', visible:true },
						{ name:'device_ports', field:'device_ports', visible:true },
						{ name:'device_proto', field:'device_proto', visible:true },
						{ name:'dnats', field:'dnats', visible:true },
						{ name:'httphosts', field:'httphosts', visible:true },
						{ name:'internal', field:'internal', visible:true },
						{ name:'ipport', field:'ipport', visible:true },
						{ name:'name', field:'name', visible:true },
						{ name:'org', field:'org', visible:true },
						{ name:'segments', field:'segments', visible:true },
						{ name:'type', field:'type', visible:true },
						{ name:'uid', field:'uid', visible:false },
					],
					data: $scope.customApps,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					apiCustomApps.save(newObject).$promise.then(function(data){
    						$scope.customApps.push(data);
    						$scope.updateResults.push({status: "ok", message: 'created.'});
    						refresh();
    					},function(error){
    						$scope.updateResults.push({status: "error", message: error.data.error.message});
							refresh();
    					});
    				},
    				onRegisterApi: function(gridApi){ 
      				$scope.gridApi = gridApi;
      					//$scope.gridApi.rowEdit.on.saveRow($scope,
      					//$scope.saveRow);
    				}
				};
  			     
				$scope.click = function(row){ 
					$scope.clicked = $timeout(function(){
						if ($scope.stopped == false){
                			$scope.customAppsSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        			},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.customAppsSelected = undefined;
				}
				
				$scope.customAppsFields = [
						{key: 'appgrps', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'appgrps', placeholder: 'appgrps', required: true
            				}
          				},
						{key: 'appid', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'appid', placeholder: 'appid', required: true
            				}
          				},
						{key: 'desc', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'desc', placeholder: 'desc', required: true
            				}
          				},
						{key: 'devgrp', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'devgrp', placeholder: 'devgrp', required: true
            				}
          				},
						{key: 'device', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'device', placeholder: 'device', required: true
            				}
          				},
						{key: 'device_ports', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'device_ports', placeholder: 'device_ports', required: true
            				}
          				},
						{key: 'device_proto', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'device_proto', placeholder: 'device_proto', required: true
            				}
          				},
						{key: 'dnats', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'dnats', placeholder: 'dnats', required: true
            				}
          				},
						{key: 'httphosts', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'httphosts', placeholder: 'httphosts', required: true
            				}
          				},
						{key: 'internal', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'internal', placeholder: 'internal', required: true
            				}
          				},
						{key: 'ipport', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'ipport', placeholder: 'ipport', required: true
            				}
          				},
						{key: 'name', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'name', placeholder: 'name', required: true
            				}
          				},
						{key: 'org', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'org', placeholder: 'org', required: true
            				}
          				},
						{key: 'segments', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'segments', placeholder: 'segments', required: true
            				}
          				},
						{key: 'type', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'type', placeholder: 'type', required: true
            				}
          				},
						{key: 'uid', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'uid', placeholder: 'uid', required: true
            				}
          				},
				];
				
				var uploadZone = document.getElementById('upload');

    			// Optional.   Show the copy icon when dragging over.  Seems to
    			// only work for chrome.
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
    		    	$scope.updateResults =[];
    		    	$scope.showUploadResults = true;
    		    	$scope.gridApi.importer.importFile(files[0]);
				});
		}]
)
;
