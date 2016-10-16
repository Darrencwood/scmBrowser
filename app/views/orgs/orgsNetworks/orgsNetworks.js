'use strict';
angular.module('myApp.orgsNetworks', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/orgs/orgsNetworks', {
  templateUrl: 'views/orgs/orgsNetworks/orgsNetworks.html',
    controller: 'orgsNetworksCtrl'
  });
}])
.controller('orgsNetworksCtrl',
		[ '$scope', 'orgsNetworksApi', '$location', 'orgsNetworksSelectionSvc', '$timeout',  'orgsSelectionSvc' , 
			function($scope, orgsNetworksApi, $location, orgsNetworksSelectionSvc, $timeout  , orgsSelectionSvc  ) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				let id = orgsSelectionSvc.getorgs();
				console.log(id);
				$scope.orgsNetworks = orgsNetworksApi.query({ orgid: id.id });
				
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
					enableSelectAll: true,
					exporterMenuPdf: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					exporterCsvFilename: 'networks.csv',
					exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
					rowHeight: 40,
					multiSelect: false,
					modifierKeysToMultiSelect: false,
					noUnselect: true,
					columnDefs: [
					{ name: 'delete',
					  cellTemplate: '<a id="delete" class="btn btn-danger" role="button" ng-click="grid.appScope.deleteRow(row)"> <span class="glyphicon glyphicon-trash"></span></a>'
					},
						{ name:'Nodenetcfgs', field:'nodenetcfgs'/*, visible: */, enableCellEdit: ('nodenetcfgs'=='id' || 'nodenetcfgs'=='uid' || 'nodenetcfgs'=='gid')? false: true},
						{ name:'Zone', field:'zone'/*, visible: */, enableCellEdit: ('zone'=='id' || 'zone'=='uid' || 'zone'=='gid')? false: true},
						{ name:'Name', field:'name'/*, visible: */, enableCellEdit: ('name'=='id' || 'name'=='uid' || 'name'=='gid')? false: true},
						{ name:'Dhcps Range Start', field:'dhcps_range_start'/*, visible: */, enableCellEdit: ('dhcps_range_start'=='id' || 'dhcps_range_start'=='uid' || 'dhcps_range_start'=='gid')? false: true},
						{ name:'Devices', field:'devices'/*, visible: */, enableCellEdit: ('devices'=='id' || 'devices'=='uid' || 'devices'=='gid')? false: true},
						{ name:'Dhcps Range End', field:'dhcps_range_end'/*, visible: */, enableCellEdit: ('dhcps_range_end'=='id' || 'dhcps_range_end'=='uid' || 'dhcps_range_end'=='gid')? false: true},
						{ name:'Primary', field:'primary'/*, visible: */, enableCellEdit: ('primary'=='id' || 'primary'=='uid' || 'primary'=='gid')? false: true},
						{ name:'Site', field:'site'/*, visible: */, enableCellEdit: ('site'=='id' || 'site'=='uid' || 'site'=='gid')? false: true},
						{ name:'Netv6', field:'netv6'/*, visible: */, enableCellEdit: ('netv6'=='id' || 'netv6'=='uid' || 'netv6'=='gid')? false: true},
						{ name:'Netv4', field:'netv4'/*, visible: */, enableCellEdit: ('netv4'=='id' || 'netv4'=='uid' || 'netv4'=='gid')? false: true},
						{ name:'Org', field:'org'/*, visible: */, enableCellEdit: ('org'=='id' || 'org'=='uid' || 'org'=='gid')? false: true},
						{ name:'Gwv6', field:'gwv6'/*, visible: */, enableCellEdit: ('gwv6'=='id' || 'gwv6'=='uid' || 'gwv6'=='gid')? false: true},
						{ name:'Ra', field:'ra'/*, visible: */, enableCellEdit: ('ra'=='id' || 'ra'=='uid' || 'ra'=='gid')? false: true},
						{ name:'Wans', field:'wans'/*, visible: */, enableCellEdit: ('wans'=='id' || 'wans'=='uid' || 'wans'=='gid')? false: true},
						{ name:'Routes', field:'routes'/*, visible: */, enableCellEdit: ('routes'=='id' || 'routes'=='uid' || 'routes'=='gid')? false: true},
						{ name:'Id', field:'id'/*, visible: */, enableCellEdit: ('id'=='id' || 'id'=='uid' || 'id'=='gid')? false: true},
						{ name:'Gwv4', field:'gwv4'/*, visible: */, enableCellEdit: ('gwv4'=='id' || 'gwv4'=='uid' || 'gwv4'=='gid')? false: true},
						{ name:'Lnets', field:'lnets'/*, visible: */, enableCellEdit: ('lnets'=='id' || 'lnets'=='uid' || 'lnets'=='gid')? false: true},
						{ name:'Breakout Preference', field:'breakout_preference'/*, visible: */, enableCellEdit: ('breakout_preference'=='id' || 'breakout_preference'=='uid' || 'breakout_preference'=='gid')? false: true},
						{ name:'Breakout Sitelink Site', field:'breakout_sitelink_site'/*, visible: */, enableCellEdit: ('breakout_sitelink_site'=='id' || 'breakout_sitelink_site'=='uid' || 'breakout_sitelink_site'=='gid')? false: true},
						{ name:'Gw Noauto', field:'gw_noauto'/*, visible: */, enableCellEdit: ('gw_noauto'=='id' || 'gw_noauto'=='uid' || 'gw_noauto'=='gid')? false: true},
						{ name:'Dhcps Leasetime', field:'dhcps_leasetime'/*, visible: */, enableCellEdit: ('dhcps_leasetime'=='id' || 'dhcps_leasetime'=='uid' || 'dhcps_leasetime'=='gid')? false: true},
						{ name:'Dhcps Options', field:'dhcps_options'/*, visible: */, enableCellEdit: ('dhcps_options'=='id' || 'dhcps_options'=='uid' || 'dhcps_options'=='gid')? false: true},
					],
					data: $scope.orgsNetworks,
						rowTemplate: '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					orgsNetworksApi.save({ orgid: id.id }, newObject).$promise.then(function(data){
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
      					gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
            				console.log('edited row id:' + rowEntity.id + ' Column:' + colDef.name + ' newValue:' + newValue + ' oldValue:' + oldValue);
            				console.log(rowEntity);
            				let req = { };
							req['netid'] = rowEntity.id;
            				orgsNetworksApi.update(req, rowEntity).$promise.then(function(success){
            					// Do nothing , we already updated the table.
            				}, function(error){
            					// TODO: Rollback change.
            				});
          				});
    					}
				};
  			     
				$scope.click = function(row){ 
					$scope.clicked = $timeout(function(){
						if ($scope.stopped == false){
                					$scope.orgsNetworksSelected = row.entity;
							$scope.showSelectedRecord = true;
							//console.log(row.entity);	
							orgsNetworksSelectionSvc.setorgsNetworks(row.entity);
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.orgsNetworksSelected = undefined;
				}
				
				$scope.deleteRow = function(row) {
					$scope.stopped = $timeout.cancel($scope.clicked);
					console.log('Deleting ' + row.entity.id);	
					let req = { };
					req['netid'] = row.entity.id;
					orgsNetworksApi.delete(req).$promise.then(function(success){
						for (let i=0; i<$scope.orgsNetworks.length; i++){
							if ($scope.orgsNetworks[i].id == row.entity.id) {
								$scope.orgsNetworks.splice(i, 1);
								refresh();
								break;
							}
						}
					}, function(error){
						console.log(error);
					});

				}
				
				$scope.orgsNetworksFields = [
						{key: 'nodenetcfgs', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'nodenetcfgs', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'zone', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'zone', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'name', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'name', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'dhcps_range_start', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'dhcps_range_start', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'devices', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'devices', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'dhcps_range_end', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'dhcps_range_end', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'primary', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'primary', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'site', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'site', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'netv6', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'netv6', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'netv4', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'netv4', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'gwv6', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'gwv6', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'ra', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'ra', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'wans', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'wans', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'routes', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'routes', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'id', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'gwv4', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'gwv4', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'lnets', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'lnets', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'breakout_preference', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'breakout_preference', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'breakout_sitelink_site', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'breakout_sitelink_site', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'gw_noauto', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'gw_noauto', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'dhcps_leasetime', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'dhcps_leasetime', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'dhcps_options', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'dhcps_options', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
				];
				console.log();
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
					dlAnchorElem.setAttribute("download", "networks.csv");
							
				$scope.closeResults = function(){
					$scope.showUploadResults = false;
				};
}]);