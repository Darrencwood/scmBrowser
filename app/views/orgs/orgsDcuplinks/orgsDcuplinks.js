'use strict';
angular.module('myApp.orgsDcuplinks', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/orgs/orgsDcuplinks', {
  templateUrl: 'views/orgs/orgsDcuplinks/orgsDcuplinks.html',
    controller: 'orgsDcuplinksCtrl'
  });
}])
.controller('orgsDcuplinksCtrl',
		[ '$scope', 'orgsDcuplinksApi', '$location', 'orgsDcuplinksSelectionSvc', '$timeout' , 'orgsSelectionSvc'   , 'proxyRegisterSvc', 
			function($scope, orgsDcuplinksApi, $location, orgsDcuplinksSelectionSvc, $timeout  , orgsSelectionSvc  , proxyRegisterSvc) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				$scope.isProxyRegister = function() {
					return proxyRegisterSvc.hasRegister;
				}
				
				$scope.orgsDcuplinksSelected = orgsSelectionSvc.getorgs();
				$scope.orgsDcuplinks = orgsDcuplinksApi.query({ orgid: $scope.orgsDcuplinksSelected.id });
				
				
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.orgsDcuplinksGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					exporterMenuPdf: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					exporterCsvFilename: 'dcuplinks.csv',
					exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
					rowHeight: 40,
					columnDefs: [
					{ name: 'delete',
					  cellTemplate: '<a id="delete" class="btn btn-danger" role="button" ng-click="grid.appScope.deleteRow(row)"> <span class="glyphicon glyphicon-trash"></span></a>'
					},
						{ name:'Org', field:'org'/*, visible: */, enableCellEdit: ('org'=='id' || 'org'=='uid' || 'org'=='gid')? false: true},
						{ name:'Net', field:'net'/*, visible: */, enableCellEdit: ('net'=='id' || 'net'=='uid' || 'net'=='gid')? false: true},
						{ name:'Public Ipv4', field:'public_ipv4'/*, visible: */, enableCellEdit: ('public_ipv4'=='id' || 'public_ipv4'=='uid' || 'public_ipv4'=='gid')? false: true},
						{ name:'Public Ipv6', field:'public_ipv6'/*, visible: */, enableCellEdit: ('public_ipv6'=='id' || 'public_ipv6'=='uid' || 'public_ipv6'=='gid')? false: true},
						{ name:'Nat Range Start', field:'nat_range_start'/*, visible: */, enableCellEdit: ('nat_range_start'=='id' || 'nat_range_start'=='uid' || 'nat_range_start'=='gid')? false: true},
						{ name:'Wan', field:'wan'/*, visible: */, enableCellEdit: ('wan'=='id' || 'wan'=='uid' || 'wan'=='gid')? false: true},
						{ name:'Cluster', field:'cluster'/*, visible: */, enableCellEdit: ('cluster'=='id' || 'cluster'=='uid' || 'cluster'=='gid')? false: true},
						{ name:'Tags', field:'tags'/*, visible: */, enableCellEdit: ('tags'=='id' || 'tags'=='uid' || 'tags'=='gid')? false: true},
					],
					data: $scope.orgsDcuplinks,
						rowTemplate: '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					orgsDcuplinksApi.save({ orgid: $scope.orgsDcuplinksSelected.id }, newObject).$promise.then(function(data){
    						$scope.orgsDcuplinks.push(data);
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
							req['dcuplinkid'] = rowEntity.id;
            				orgsDcuplinksApi.update(req, rowEntity).$promise.then(function(success){
            					// Do nothing , we already updated the table.
            				}, function(error){
            					// TODO: Rollback change.
            				});
          				});
    					}
				};
				$scope.deselect = function(){ 
					orgsDcuplinksSelectionSvc.setorgsDcuplinks();
					$location.path('/orgs');
				}
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.orgsDcuplinksSelected = undefined;
				}
				
				$scope.deleteRow = function(row) {
					$scope.stopped = $timeout.cancel($scope.clicked);
					console.log('Deleting ' + row.entity.id);	
					let req = { };
					req['dcuplinkid'] = row.entity.id;
					orgsDcuplinksApi.delete(req).$promise.then(function(success){
						for (let i=0; i<$scope.orgsDcuplinks.length; i++){
							if ($scope.orgsDcuplinks[i].id == row.entity.id) {
								$scope.orgsDcuplinks.splice(i, 1);
								refresh();
								break;
							}
						}
					}, function(error){
						console.log(error);
					});

				}
				
				$scope.orgsDcuplinksFields = [
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'net', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'net', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'public_ipv4', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'public_ipv4', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'public_ipv6', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'public_ipv6', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'nat_range_start', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'nat_range_start', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'wan', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'wan', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'cluster', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'cluster', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'tags', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'tags', placeholder: "", disabled: true/*, required: */ 
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
					
					var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent("org,net,public_ipv4,public_ipv6,nat_range_start,wan,cluster,tags\n");
					var dlAnchorElem = document.getElementById('download');
					dlAnchorElem.setAttribute("href",     dataStr     );
					dlAnchorElem.setAttribute("download", "dcuplinks.csv");
							
				$scope.closeResults = function(){
					$scope.showUploadResults = false;
				};
}]);