'use strict';

angular.module('myApp.uplinks', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/uplinks', {
    templateUrl: 'views/uplinks/uplinks.html',
    controller: 'uplinksCtrl'
  });
}])
.controller('uplinksCtrl',
		[ '$scope', 'apiUplinks', '$location', 'currentUplinks', '$timeout',
			function($scope, apiUplinks, $location, currentUplinks, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.uplinks = apiUplinks.query();
				$scope.uplinksSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.uplinksGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'name', field:'name', visible:true },
						{ name:'node', field:'node', visible:true },
						{ name:'org', field:'org', visible:true },
						{ name:'port', field:'port', visible:true },
						{ name:'qos_bw_down', field:'qos_bw_down', visible:true },
						{ name:'qos_bw_up', field:'qos_bw_up', visible:true },
						{ name:'site', field:'site', visible:true },
						{ name:'static_gw_v4', field:'static_gw_v4', visible:false },
						{ name:'static_gw_v6', field:'static_gw_v6', visible:false },
						{ name:'static_ip_v4', field:'static_ip_v4', visible:false },
						{ name:'static_ip_v6', field:'static_ip_v6', visible:false },
						{ name:'type', field:'type', visible:true },
						{ name:'uid', field:'uid', visible:false },
						{ name:'uin', field:'uin', visible:true },
						{ name:'vlan', field:'vlan', visible:true },
						{ name:'wan', field:'wan', visible:true },
					],
					data: $scope.uplinks,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					apiUplinks.save(newObject).$promise.then(function(data){
    						$scope.uplinks.push(data);
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
                			$scope.uplinksSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        			},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.uplinksSelected = undefined;
				}
				
				$scope.uplinksFields = [
						{key: 'name', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'name', placeholder: 'name', required: true
            				}
          				},
						{key: 'node', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'node', placeholder: 'node', required: true
            				}
          				},
						{key: 'org', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'org', placeholder: 'org', required: true
            				}
          				},
						{key: 'port', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'port', placeholder: 'port', required: true
            				}
          				},
						{key: 'qos_bw_down', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'qos_bw_down', placeholder: 'qos_bw_down', required: true
            				}
          				},
						{key: 'qos_bw_up', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'qos_bw_up', placeholder: 'qos_bw_up', required: true
            				}
          				},
						{key: 'site', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'site', placeholder: 'site', required: true
            				}
          				},
						{key: 'static_gw_v4', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'static_gw_v4', placeholder: 'static_gw_v4', required: false
            				}
          				},
						{key: 'static_gw_v6', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'static_gw_v6', placeholder: 'static_gw_v6', required: false
            				}
          				},
						{key: 'static_ip_v4', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'static_ip_v4', placeholder: 'static_ip_v4', required: false
            				}
          				},
						{key: 'static_ip_v6', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'static_ip_v6', placeholder: 'static_ip_v6', required: false
            				}
          				},
						{key: 'type', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'type', placeholder: 'type', required: true
            				}
          				},
						{key: 'uid', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'uid', placeholder: 'uid', required: false
            				}
          				},
						{key: 'uin', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'uin', placeholder: 'uin', required: false
            				}
          				},
						{key: 'vlan', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'vlan', placeholder: 'vlan', required: true
            				}
          				},
						{key: 'wan', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'wan', placeholder: 'wan', required: true
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
