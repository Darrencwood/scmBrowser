'use strict';
angular.module('myApp.orgsNetworks', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/orgsNetworks', {
    templateUrl: 'views/orgsNetworks/orgsNetworks.html',
    controller: 'orgsNetworksCtrl'
  });
}])
.controller('orgsNetworksCtrl',
		[ '$scope', 'orgsNetworksApi', '$location', 'orgsNetworksSelectionSvc', '$timeout',
			function($scope, orgsNetworksApi, $location, orgsNetworksSelectionSvc, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.orgsNetworks = orgsNetworksApi.query();
				$scope.orgsNetworksSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.orgsNetworksGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'Nodenetcfgs', field:'nodenetcfgs'/*, visible: */},
						{ name:'Zone', field:'zone'/*, visible: */},
						{ name:'Name', field:'name'/*, visible: */},
						{ name:'Dhcps Range Start', field:'dhcps_range_start'/*, visible: */},
						{ name:'Devices', field:'devices'/*, visible: */},
						{ name:'Dhcps Range End', field:'dhcps_range_end'/*, visible: */},
						{ name:'Primary', field:'primary'/*, visible: */},
						{ name:'Site', field:'site'/*, visible: */},
						{ name:'Netv6', field:'netv6'/*, visible: */},
						{ name:'Netv4', field:'netv4'/*, visible: */},
						{ name:'Org', field:'org'/*, visible: */},
						{ name:'Gwv6', field:'gwv6'/*, visible: */},
						{ name:'Ra', field:'ra'/*, visible: */},
						{ name:'Wans', field:'wans'/*, visible: */},
						{ name:'Routes', field:'routes'/*, visible: */},
						{ name:'Id', field:'id'/*, visible: */},
						{ name:'Gwv4', field:'gwv4'/*, visible: */},
						{ name:'Lnets', field:'lnets'/*, visible: */},
						{ name:'Breakout Preference', field:'breakout_preference'/*, visible: */},
						{ name:'Breakout Sitelink Site', field:'breakout_sitelink_site'/*, visible: */},
						{ name:'Gw Noauto', field:'gw_noauto'/*, visible: */},
						{ name:'Dhcps Leasetime', field:'dhcps_leasetime'/*, visible: */},
						{ name:'Dhcps Options', field:'dhcps_options'/*, visible: */},
					],
					data: $scope.orgsNetworks,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					orgsNetworksApi.save(newObject).$promise.then(function(data){
    						$scope.orgsNetworks.push(data);
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
                					$scope.orgsNetworksSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.orgsNetworksSelected = undefined;
				}
				
				$scope.orgsNetworksFields = [
						{key: 'nodenetcfgs', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'nodenetcfgs', placeholder: ""/*, required: */
            					}
          				},
						{key: 'zone', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'zone', placeholder: ""/*, required: */
            					}
          				},
						{key: 'name', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'name', placeholder: ""/*, required: */
            					}
          				},
						{key: 'dhcps_range_start', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'dhcps_range_start', placeholder: ""/*, required: */
            					}
          				},
						{key: 'devices', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'devices', placeholder: ""/*, required: */
            					}
          				},
						{key: 'dhcps_range_end', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'dhcps_range_end', placeholder: ""/*, required: */
            					}
          				},
						{key: 'primary', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'primary', placeholder: ""/*, required: */
            					}
          				},
						{key: 'site', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'site', placeholder: ""/*, required: */
            					}
          				},
						{key: 'netv6', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'netv6', placeholder: ""/*, required: */
            					}
          				},
						{key: 'netv4', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'netv4', placeholder: ""/*, required: */
            					}
          				},
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: ""/*, required: */
            					}
          				},
						{key: 'gwv6', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'gwv6', placeholder: ""/*, required: */
            					}
          				},
						{key: 'ra', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'ra', placeholder: ""/*, required: */
            					}
          				},
						{key: 'wans', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'wans', placeholder: ""/*, required: */
            					}
          				},
						{key: 'routes', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'routes', placeholder: ""/*, required: */
            					}
          				},
						{key: 'id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'id', placeholder: ""/*, required: */
            					}
          				},
						{key: 'gwv4', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'gwv4', placeholder: ""/*, required: */
            					}
          				},
						{key: 'lnets', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'lnets', placeholder: ""/*, required: */
            					}
          				},
						{key: 'breakout_preference', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'breakout_preference', placeholder: ""/*, required: */
            					}
          				},
						{key: 'breakout_sitelink_site', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'breakout_sitelink_site', placeholder: ""/*, required: */
            					}
          				},
						{key: 'gw_noauto', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'gw_noauto', placeholder: ""/*, required: */
            					}
          				},
						{key: 'dhcps_leasetime', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'dhcps_leasetime', placeholder: ""/*, required: */
            					}
          				},
						{key: 'dhcps_options', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'dhcps_options', placeholder: ""/*, required: */
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
								
				var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent("nodenetcfgs,zone,name,dhcps_range_start,devices,dhcps_range_end,primary,site,netv6,netv4,org,gwv6,ra,wans,routes,gwv4,lnets,breakout_preference,breakout_sitelink_site,gw_noauto,dhcps_leasetime,dhcps_options\n");
				var dlAnchorElem = document.getElementById('download');
				dlAnchorElem.setAttribute("href",     dataStr     );
				dlAnchorElem.setAttribute("download", "org.csv");
				
				$scope.closeResults = function(){
					$scope.showUploadResults = false;
				};
}]);