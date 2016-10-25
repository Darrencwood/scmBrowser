'use strict';
angular.module('myApp.orgsWans', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/orgs/orgsWans', {
  templateUrl: 'views/orgs/orgsWans/orgsWans.html',
    controller: 'orgsWansCtrl'
  });
}])
.controller('orgsWansCtrl',
		[ '$scope', 'orgsWansApi', '$location', 'orgsWansSelectionSvc', '$timeout' , 'orgsSelectionSvc'   , 'proxyRegisterSvc', 
			function($scope, orgsWansApi, $location, orgsWansSelectionSvc, $timeout  , orgsSelectionSvc  , proxyRegisterSvc) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				$scope.isProxyRegister = function() {
					return proxyRegisterSvc.hasRegister;
				}
				
				$scope.orgsWansSelected = orgsSelectionSvc.getorgs();
				$scope.orgsWans = orgsWansApi.query({ orgid: $scope.orgsWansSelected.id });
				
				
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.orgsWansGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					exporterMenuPdf: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					exporterCsvFilename: 'wans.csv',
					exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
					rowHeight: 40,
					columnDefs: [
					{ name: 'delete',
					  cellTemplate: '<a id="delete" class="btn btn-danger" role="button" ng-click="grid.appScope.deleteRow(row)"> <span class="glyphicon glyphicon-trash"></span></a>'
					},
						{ name:'Id', field:'id'/*, visible: */, enableCellEdit: ('id'=='id' || 'id'=='uid' || 'id'=='gid')? false: true},
						{ name:'Org', field:'org'/*, visible: */, enableCellEdit: ('org'=='id' || 'org'=='uid' || 'org'=='gid')? false: true},
						{ name:'Uplinks', field:'uplinks'/*, visible: */, enableCellEdit: ('uplinks'=='id' || 'uplinks'=='uid' || 'uplinks'=='gid')? false: true},
						{ name:'Nets', field:'nets'/*, visible: */, enableCellEdit: ('nets'=='id' || 'nets'=='uid' || 'nets'=='gid')? false: true},
						{ name:'Name', field:'name'/*, visible: */, enableCellEdit: ('name'=='id' || 'name'=='uid' || 'name'=='gid')? false: true},
						{ name:'Longname', field:'longname'/*, visible: */, enableCellEdit: ('longname'=='id' || 'longname'=='uid' || 'longname'=='gid')? false: true},
						{ name:'Uid', field:'uid'/*, visible: */, enableCellEdit: ('uid'=='id' || 'uid'=='uid' || 'uid'=='gid')? false: true},
						{ name:'Internet', field:'internet'/*, visible: */, enableCellEdit: ('internet'=='id' || 'internet'=='uid' || 'internet'=='gid')? false: true},
						{ name:'Sitelink', field:'sitelink'/*, visible: */, enableCellEdit: ('sitelink'=='id' || 'sitelink'=='uid' || 'sitelink'=='gid')? false: true},
						{ name:'Pingcheck Ips', field:'pingcheck_ips'/*, visible: */, enableCellEdit: ('pingcheck_ips'=='id' || 'pingcheck_ips'=='uid' || 'pingcheck_ips'=='gid')? false: true},
						{ name:'Dcuplink', field:'dcuplink'/*, visible: */, enableCellEdit: ('dcuplink'=='id' || 'dcuplink'=='uid' || 'dcuplink'=='gid')? false: true},
						{ name:'Breakout', field:'breakout'/*, visible: */, enableCellEdit: ('breakout'=='id' || 'breakout'=='uid' || 'breakout'=='gid')? false: true},
						{ name:'Breakout Sites', field:'breakout_sites'/*, visible: */, enableCellEdit: ('breakout_sites'=='id' || 'breakout_sites'=='uid' || 'breakout_sites'=='gid')? false: true},
						{ name:'Xfer Networks', field:'xfer_networks'/*, visible: */, enableCellEdit: ('xfer_networks'=='id' || 'xfer_networks'=='uid' || 'xfer_networks'=='gid')? false: true},
					],
					data: $scope.orgsWans,
						rowTemplate: '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					orgsWansApi.save({ orgid: $scope.orgsWansSelected.id }, newObject).$promise.then(function(data){
    						$scope.orgsWans.push(data);
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
							req['wanid'] = rowEntity.id;
            				orgsWansApi.update(req, rowEntity).$promise.then(function(success){
            					// Do nothing , we already updated the table.
            				}, function(error){
            					// TODO: Rollback change.
            				});
          				});
    					}
				};
				$scope.deselect = function(){ 
					orgsWansSelectionSvc.setorgsWans();
					$location.path('/orgs');
				}
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.orgsWansSelected = undefined;
				}
				
				$scope.deleteRow = function(row) {
					$scope.stopped = $timeout.cancel($scope.clicked);
					console.log('Deleting ' + row.entity.id);	
					let req = { };
					req['wanid'] = row.entity.id;
					orgsWansApi.delete(req).$promise.then(function(success){
						for (let i=0; i<$scope.orgsWans.length; i++){
							if ($scope.orgsWans[i].id == row.entity.id) {
								$scope.orgsWans.splice(i, 1);
								refresh();
								break;
							}
						}
					}, function(error){
						console.log(error);
					});

				}
				
				$scope.orgsWansFields = [
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
						{key: 'uplinks', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'uplinks', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'nets', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'nets', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'name', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'name', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'longname', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'longname', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'uid', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'uid', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'internet', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'internet', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'sitelink', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'sitelink', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'pingcheck_ips', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'pingcheck_ips', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'dcuplink', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'dcuplink', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'breakout', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'breakout', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'breakout_sites', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'breakout_sites', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'xfer_networks', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'xfer_networks', placeholder: "", disabled: true/*, required: */ 
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
					
					var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent("org,uplinks,nets,name,longname,internet,sitelink,pingcheck_ips,dcuplink,breakout,breakout_sites,xfer_networks\n");
					var dlAnchorElem = document.getElementById('download');
					dlAnchorElem.setAttribute("href",     dataStr     );
					dlAnchorElem.setAttribute("download", "wans.csv");
							
				$scope.closeResults = function(){
					$scope.showUploadResults = false;
				};
}]);