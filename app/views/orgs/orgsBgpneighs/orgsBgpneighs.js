'use strict';
angular.module('myApp.orgsBgpneighs', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/orgs/orgsBgpneighs', {
  templateUrl: 'views/orgs/orgsBgpneighs/orgsBgpneighs.html',
    controller: 'orgsBgpneighsCtrl'
  });
}])
.controller('orgsBgpneighsCtrl',
		[ '$scope', 'orgsBgpneighsApi', '$location', 'orgsBgpneighsSelectionSvc', '$timeout' , 'orgsSelectionSvc'   , 'proxyRegisterSvc', 
			function($scope, orgsBgpneighsApi, $location, orgsBgpneighsSelectionSvc, $timeout  , orgsSelectionSvc  , proxyRegisterSvc) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				$scope.isProxyRegister = function() {
					return proxyRegisterSvc.hasRegister;
				}
				
				$scope.orgsBgpneighsSelected = orgsSelectionSvc.getorgs();
				$scope.orgsBgpneighs = orgsBgpneighsApi.query({ orgid: $scope.orgsBgpneighsSelected.id });
				
				
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.orgsBgpneighsGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					exporterMenuPdf: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					exporterCsvFilename: 'bgpneighs.csv',
					exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
					rowHeight: 40,
					columnDefs: [
					{ name: 'delete',
					  cellTemplate: '<a id="delete" class="btn btn-danger" role="button" ng-click="grid.appScope.deleteRow(row)"> <span class="glyphicon glyphicon-trash"></span></a>'
					},
						{ name:'Org', field:'org'/*, visible: */, enableCellEdit: ('org'=='id' || 'org'=='uid' || 'org'=='gid')? false: true},
						{ name:'Node', field:'node'/*, visible: */, enableCellEdit: ('node'=='id' || 'node'=='uid' || 'node'=='gid')? false: true},
						{ name:'Name', field:'name'/*, visible: */, enableCellEdit: ('name'=='id' || 'name'=='uid' || 'name'=='gid')? false: true},
						{ name:'Ipv4', field:'ipv4'/*, visible: */, enableCellEdit: ('ipv4'=='id' || 'ipv4'=='uid' || 'ipv4'=='gid')? false: true},
						{ name:'Remote As', field:'remote_as'/*, visible: */, enableCellEdit: ('remote_as'=='id' || 'remote_as'=='uid' || 'remote_as'=='gid')? false: true},
						{ name:'Password', field:'password'/*, visible: */, enableCellEdit: ('password'=='id' || 'password'=='uid' || 'password'=='gid')? false: true},
						{ name:'Keepalive Time', field:'keepalive_time'/*, visible: */, enableCellEdit: ('keepalive_time'=='id' || 'keepalive_time'=='uid' || 'keepalive_time'=='gid')? false: true},
						{ name:'Hold Time', field:'hold_time'/*, visible: */, enableCellEdit: ('hold_time'=='id' || 'hold_time'=='uid' || 'hold_time'=='gid')? false: true},
					],
					data: $scope.orgsBgpneighs,
						rowTemplate: '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					orgsBgpneighsApi.save({ orgid: $scope.orgsBgpneighsSelected.id }, newObject).$promise.then(function(data){
    						$scope.orgsBgpneighs.push(data);
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
							req['bgpneighid'] = rowEntity.id;
            				orgsBgpneighsApi.update(req, rowEntity).$promise.then(function(success){
            					// Do nothing , we already updated the table.
            				}, function(error){
            					// TODO: Rollback change.
            				});
          				});
    					}
				};
				$scope.deselect = function(){ 
					orgsBgpneighsSelectionSvc.setorgsBgpneighs();
					$location.path('/orgs');
				}
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.orgsBgpneighsSelected = undefined;
				}
				
				$scope.deleteRow = function(row) {
					$scope.stopped = $timeout.cancel($scope.clicked);
					console.log('Deleting ' + row.entity.id);	
					let req = { };
					req['bgpneighid'] = row.entity.id;
					orgsBgpneighsApi.delete(req).$promise.then(function(success){
						for (let i=0; i<$scope.orgsBgpneighs.length; i++){
							if ($scope.orgsBgpneighs[i].id == row.entity.id) {
								$scope.orgsBgpneighs.splice(i, 1);
								refresh();
								break;
							}
						}
					}, function(error){
						console.log(error);
					});

				}
				
				$scope.orgsBgpneighsFields = [
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'node', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'node', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'name', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'name', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'ipv4', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'ipv4', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'remote_as', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'remote_as', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'password', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'password', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'keepalive_time', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'keepalive_time', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'hold_time', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'hold_time', placeholder: "", disabled: true/*, required: */ 
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
					
					var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent("org,node,name,ipv4,remote_as,password,keepalive_time,hold_time\n");
					var dlAnchorElem = document.getElementById('download');
					dlAnchorElem.setAttribute("href",     dataStr     );
					dlAnchorElem.setAttribute("download", "bgpneighs.csv");
							
				$scope.closeResults = function(){
					$scope.showUploadResults = false;
				};
}]);