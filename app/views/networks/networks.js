'use strict';

angular.module('myApp.networks', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/networks', {
    templateUrl: 'views/networks/networks.html',
    controller: 'networksCtrl'
  });
}])
.controller('networksCtrl',
		[ '$scope', 'apiNetworks', '$location', 'currentNetworks', '$timeout',
			function($scope, apiNetworks, $location, currentNetworks, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.networks = apiNetworks.query();
				$scope.networksSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.networksGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'breakout_preference', field:'breakout_preference', visible:true },
						{ name:'breakout_sitelink_site', field:'breakout_sitelink_site', visible:true },
						{ name:'devices', field:'devices', visible:true },
						{ name:'dhcps_leasetime', field:'dhcps_leasetime', visible:true },
						{ name:'dhcps_options', field:'dhcps_options', visible:true },
						{ name:'dhcps_range_start', field:'dhcps_range_start', visible:true },
						{ name:'dhcps_range_end', field:'dhcps_range_end', visible:true },
						{ name:'gw_noauto', field:'gw_noauto', visible:true },
						{ name:'gwv4', field:'gwv4', visible:true },
						{ name:'gwv6', field:'gwv6', visible:true },
						{ name:'lnets', field:'lnets', visible:true },
						{ name:'name', field:'name', visible:true },
						{ name:'netv4', field:'netv4', visible:true },
						{ name:'netv6', field:'netv6', visible:true },
						{ name:'nodenetcfgs', field:'nodenetcfgs', visible:true },
						{ name:'org', field:'org', visible:true },
						{ name:'primary', field:'primary', visible:true },
						{ name:'ra', field:'ra', visible:true },
						{ name:'routes', field:'routes', visible:true },
						{ name:'site', field:'site', visible:true },
						{ name:'wans', field:'wans', visible:true },
						{ name:'zone', field:'zone', visible:true },
					],
					data: $scope.networks,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					apiNetworks.save(newObject).$promise.then(function(data){
    						$scope.networks.push(data);
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
                			$scope.networksSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        			},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.networksSelected = undefined;
				}
				
				$scope.networksFields = [
						{key: 'breakout_preference', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'breakout_preference', placeholder: 'breakout_preference', required: true
            				}
          				},
						{key: 'breakout_sitelink_site', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'breakout_sitelink_site', placeholder: 'breakout_sitelink_site', required: true
            				}
          				},
						{key: 'devices', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'devices', placeholder: 'devices', required: true
            				}
          				},
						{key: 'dhcps_leasetime', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'dhcps_leasetime', placeholder: 'dhcps_leasetime', required: true
            				}
          				},
						{key: 'dhcps_options', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'dhcps_options', placeholder: 'dhcps_options', required: true
            				}
          				},
						{key: 'dhcps_range_start', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'dhcps_range_start', placeholder: 'dhcps_range_start', required: true
            				}
          				},
						{key: 'dhcps_range_end', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'dhcps_range_end', placeholder: 'dhcps_range_end', required: true
            				}
          				},
						{key: 'gw_noauto', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'gw_noauto', placeholder: 'gw_noauto', required: true
            				}
          				},
						{key: 'gwv4', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'gwv4', placeholder: 'gwv4', required: true
            				}
          				},
						{key: 'gwv6', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'gwv6', placeholder: 'gwv6', required: true
            				}
          				},
						{key: 'lnets', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'lnets', placeholder: 'lnets', required: true
            				}
          				},
						{key: 'name', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'name', placeholder: 'name', required: true
            				}
          				},
						{key: 'netv4', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'netv4', placeholder: 'netv4', required: true
            				}
          				},
						{key: 'netv6', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'netv6', placeholder: 'netv6', required: true
            				}
          				},
						{key: 'nodenetcfgs', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'nodenetcfgs', placeholder: 'nodenetcfgs', required: true
            				}
          				},
						{key: 'org', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'org', placeholder: 'org', required: true
            				}
          				},
						{key: 'primary', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'primary', placeholder: 'primary', required: true
            				}
          				},
						{key: 'ra', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'ra', placeholder: 'ra', required: true
            				}
          				},
						{key: 'routes', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'routes', placeholder: 'routes', required: true
            				}
          				},
						{key: 'site', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'site', placeholder: 'site', required: true
            				}
          				},
						{key: 'wans', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'wans', placeholder: 'wans', required: true
            				}
          				},
						{key: 'zone', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'zone', placeholder: 'zone', required: true
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
