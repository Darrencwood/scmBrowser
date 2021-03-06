'use strict';
angular.module('myApp.orgsUplinks', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/orgs/orgsUplinks', {
  templateUrl: 'views/orgs/orgsUplinks/orgsUplinks.html',
    controller: 'orgsUplinksCtrl'
  });
}])
.controller('orgsUplinksCtrl',
		[ '$scope', 'orgsUplinksApi', '$location', 'orgsUplinksSelectionSvc', '$timeout' , 'orgsSelectionSvc'   , 'proxyRegisterSvc', 
			function($scope, orgsUplinksApi, $location, orgsUplinksSelectionSvc, $timeout  , orgsSelectionSvc  , proxyRegisterSvc) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				$scope.isProxyRegister = function() {
					return proxyRegisterSvc.hasRegister;
				}
				
				$scope.orgsUplinksSelected = orgsSelectionSvc.getorgs();
				$scope.orgsUplinks = orgsUplinksApi.query({ orgid: $scope.orgsUplinksSelected.id });
				
				
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.orgsUplinksGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					exporterMenuPdf: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					exporterCsvFilename: 'uplinks.csv',
					exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
					rowHeight: 40,
					columnDefs: [
					{ name: 'delete',
					  cellTemplate: '<a id="delete" class="btn btn-danger" role="button" ng-click="grid.appScope.deleteRow(row)"> <span class="glyphicon glyphicon-trash"></span></a>'
					},
						{ name:'Org', field:'org'/*, visible: */, enableCellEdit: ('org'=='id' || 'org'=='uid' || 'org'=='gid')? false: true},
						{ name:'Qos Bw Up', field:'qos_bw_up'/*, visible: */, enableCellEdit: ('qos_bw_up'=='id' || 'qos_bw_up'=='uid' || 'qos_bw_up'=='gid')? false: true},
						{ name:'Qos Up', field:'qos_up'/*, visible: */, enableCellEdit: ('qos_up'=='id' || 'qos_up'=='uid' || 'qos_up'=='gid')? false: true},
						{ name:'Site', field:'site'/*, visible: */, enableCellEdit: ('site'=='id' || 'site'=='uid' || 'site'=='gid')? false: true},
						{ name:'Static Ip V6', field:'static_ip_v6'/*, visible: */, enableCellEdit: ('static_ip_v6'=='id' || 'static_ip_v6'=='uid' || 'static_ip_v6'=='gid')? false: true},
						{ name:'Uin', field:'uin'/*, visible: */, enableCellEdit: ('uin'=='id' || 'uin'=='uid' || 'uin'=='gid')? false: true},
						{ name:'Uid', field:'uid'/*, visible: */, enableCellEdit: ('uid'=='id' || 'uid'=='uid' || 'uid'=='gid')? false: true},
						{ name:'Node', field:'node'/*, visible: */, enableCellEdit: ('node'=='id' || 'node'=='uid' || 'node'=='gid')? false: true},
						{ name:'Name', field:'name'/*, visible: */, enableCellEdit: ('name'=='id' || 'name'=='uid' || 'name'=='gid')? false: true},
						{ name:'Static Gw V4', field:'static_gw_v4'/*, visible: */, enableCellEdit: ('static_gw_v4'=='id' || 'static_gw_v4'=='uid' || 'static_gw_v4'=='gid')? false: true},
						{ name:'Id', field:'id'/*, visible: */, enableCellEdit: ('id'=='id' || 'id'=='uid' || 'id'=='gid')? false: true},
						{ name:'Wan', field:'wan'/*, visible: */, enableCellEdit: ('wan'=='id' || 'wan'=='uid' || 'wan'=='gid')? false: true},
						{ name:'Static Gw V6', field:'static_gw_v6'/*, visible: */, enableCellEdit: ('static_gw_v6'=='id' || 'static_gw_v6'=='uid' || 'static_gw_v6'=='gid')? false: true},
						{ name:'Qos Bw Down', field:'qos_bw_down'/*, visible: */, enableCellEdit: ('qos_bw_down'=='id' || 'qos_bw_down'=='uid' || 'qos_bw_down'=='gid')? false: true},
						{ name:'Qos Down', field:'qos_down'/*, visible: */, enableCellEdit: ('qos_down'=='id' || 'qos_down'=='uid' || 'qos_down'=='gid')? false: true},
						{ name:'Static Ip V4', field:'static_ip_v4'/*, visible: */, enableCellEdit: ('static_ip_v4'=='id' || 'static_ip_v4'=='uid' || 'static_ip_v4'=='gid')? false: true},
						{ name:'Port', field:'port'/*, visible: */, enableCellEdit: ('port'=='id' || 'port'=='uid' || 'port'=='gid')? false: true},
						{ name:'Vlan', field:'vlan'/*, visible: */, enableCellEdit: ('vlan'=='id' || 'vlan'=='uid' || 'vlan'=='gid')? false: true},
						{ name:'Type', field:'type'/*, visible: */, enableCellEdit: ('type'=='id' || 'type'=='uid' || 'type'=='gid')? false: true},
					],
					data: $scope.orgsUplinks,
						rowTemplate: '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					orgsUplinksApi.save({ orgid: $scope.orgsUplinksSelected.id }, newObject).$promise.then(function(data){
    						$scope.orgsUplinks.push(data);
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
							req['uplinkid'] = rowEntity.id;
            				orgsUplinksApi.update(req, rowEntity).$promise.then(function(success){
            					// Do nothing , we already updated the table.
            				}, function(error){
            					// TODO: Rollback change.
            				});
          				});
    					}
				};
				$scope.deselect = function(){ 
					orgsUplinksSelectionSvc.setorgsUplinks();
					$location.path('/orgs');
				}
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.orgsUplinksSelected = undefined;
				}
				
				$scope.deleteRow = function(row) {
					$scope.stopped = $timeout.cancel($scope.clicked);
					console.log('Deleting ' + row.entity.id);	
					let req = { };
					req['uplinkid'] = row.entity.id;
					orgsUplinksApi.delete(req).$promise.then(function(success){
						for (let i=0; i<$scope.orgsUplinks.length; i++){
							if ($scope.orgsUplinks[i].id == row.entity.id) {
								$scope.orgsUplinks.splice(i, 1);
								refresh();
								break;
							}
						}
					}, function(error){
						console.log(error);
					});

				}
				
				$scope.orgsUplinksFields = [
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'qos_bw_up', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'qos_bw_up', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'qos_up', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'qos_up', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'site', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'site', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'static_ip_v6', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'static_ip_v6', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'uin', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'uin', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'uid', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'uid', placeholder: "", disabled: true/*, required: */ 
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
						{key: 'static_gw_v4', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'static_gw_v4', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'id', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'wan', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'wan', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'static_gw_v6', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'static_gw_v6', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'qos_bw_down', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'qos_bw_down', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'qos_down', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'qos_down', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'static_ip_v4', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'static_ip_v4', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'port', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'port', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'vlan', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'vlan', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'type', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'type', placeholder: "", disabled: true/*, required: */ 
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
					
					var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent("org,qos_bw_up,qos_up,site,static_ip_v6,uin,uid,node,name,static_gw_v4,wan,static_gw_v6,qos_bw_down,qos_down,static_ip_v4,port,vlan,type\n");
					var dlAnchorElem = document.getElementById('download');
					dlAnchorElem.setAttribute("href",     dataStr     );
					dlAnchorElem.setAttribute("download", "uplinks.csv");
							
				$scope.closeResults = function(){
					$scope.showUploadResults = false;
				};
}]);