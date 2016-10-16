'use strict';
angular.module('myApp.orgsBroadcasts', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/orgs/orgsBroadcasts', {
  templateUrl: 'views/orgs/orgsBroadcasts/orgsBroadcasts.html',
    controller: 'orgsBroadcastsCtrl'
  });
}])
.controller('orgsBroadcastsCtrl',
		[ '$scope', 'orgsBroadcastsApi', '$location', 'orgsBroadcastsSelectionSvc', '$timeout',  'orgsSelectionSvc' , 
			function($scope, orgsBroadcastsApi, $location, orgsBroadcastsSelectionSvc, $timeout  , orgsSelectionSvc  ) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				let id = orgsSelectionSvc.getorgs();
				console.log(id);
				$scope.orgsBroadcasts = orgsBroadcastsApi.query({ orgid: id.id });
				
				$scope.orgsBroadcastsSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.orgsBroadcastsGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					enableSelectAll: true,
					exporterMenuPdf: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					exporterCsvFilename: 'broadcasts.csv',
					exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
					rowHeight: 40,
					multiSelect: false,
					modifierKeysToMultiSelect: false,
					noUnselect: true,
					columnDefs: [
					{ name: 'delete',
					  cellTemplate: '<a id="delete" class="btn btn-danger" role="button" ng-click="grid.appScope.deleteRow(row)"> <span class="glyphicon glyphicon-trash"></span></a>'
					},
						{ name:'Id', field:'id'/*, visible: */, enableCellEdit: ('id'=='id' || 'id'=='uid' || 'id'=='gid')? false: true},
						{ name:'Org', field:'org'/*, visible: */, enableCellEdit: ('org'=='id' || 'org'=='uid' || 'org'=='gid')? false: true},
						{ name:'Site', field:'site'/*, visible: */, enableCellEdit: ('site'=='id' || 'site'=='uid' || 'site'=='gid')? false: true},
						{ name:'Zone', field:'zone'/*, visible: */, enableCellEdit: ('zone'=='id' || 'zone'=='uid' || 'zone'=='gid')? false: true},
						{ name:'Ssid', field:'ssid'/*, visible: */, enableCellEdit: ('ssid'=='id' || 'ssid'=='uid' || 'ssid'=='gid')? false: true},
						{ name:'Inactive', field:'inactive'/*, visible: */, enableCellEdit: ('inactive'=='id' || 'inactive'=='uid' || 'inactive'=='gid')? false: true},
						{ name:'Dynzone', field:'dynzone'/*, visible: */, enableCellEdit: ('dynzone'=='id' || 'dynzone'=='uid' || 'dynzone'=='gid')? false: true},
						{ name:'Portal', field:'portal'/*, visible: */, enableCellEdit: ('portal'=='id' || 'portal'=='uid' || 'portal'=='gid')? false: true},
						{ name:'Hide Ssid', field:'hide_ssid'/*, visible: */, enableCellEdit: ('hide_ssid'=='id' || 'hide_ssid'=='uid' || 'hide_ssid'=='gid')? false: true},
						{ name:'Band', field:'band'/*, visible: */, enableCellEdit: ('band'=='id' || 'band'=='uid' || 'band'=='gid')? false: true},
					],
					data: $scope.orgsBroadcasts,
						rowTemplate: '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					orgsBroadcastsApi.save({ orgid: id.id }, newObject).$promise.then(function(data){
    						$scope.orgsBroadcasts.push(data);
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
							req['bcastid'] = rowEntity.id;
            				orgsBroadcastsApi.update(req, rowEntity).$promise.then(function(success){
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
                					$scope.orgsBroadcastsSelected = row.entity;
							$scope.showSelectedRecord = true;
							//console.log(row.entity);	
							orgsBroadcastsSelectionSvc.setorgsBroadcasts(row.entity);
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.orgsBroadcastsSelected = undefined;
				}
				
				$scope.deleteRow = function(row) {
					$scope.stopped = $timeout.cancel($scope.clicked);
					console.log('Deleting ' + row.entity.id);	
					let req = { };
					req['bcastid'] = row.entity.id;
					orgsBroadcastsApi.delete(req).$promise.then(function(success){
						for (let i=0; i<$scope.orgsBroadcasts.length; i++){
							if ($scope.orgsBroadcasts[i].id == row.entity.id) {
								$scope.orgsBroadcasts.splice(i, 1);
								refresh();
								break;
							}
						}
					}, function(error){
						console.log(error);
					});

				}
				
				$scope.orgsBroadcastsFields = [
						{key: 'id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'id', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'site', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'site', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'zone', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'zone', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'ssid', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'ssid', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'inactive', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'inactive', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'dynzone', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'dynzone', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'portal', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'portal', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'hide_ssid', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'hide_ssid', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'band', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'band', placeholder: "", disabled: true/*, required: */ 
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
					
					var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent("org,site,zone,ssid,inactive,dynzone,portal,hide_ssid,band\n");
					var dlAnchorElem = document.getElementById('download');
					dlAnchorElem.setAttribute("href",     dataStr     );
					dlAnchorElem.setAttribute("download", "broadcasts.csv");
							
				$scope.closeResults = function(){
					$scope.showUploadResults = false;
				};
}]);