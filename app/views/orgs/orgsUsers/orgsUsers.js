'use strict';
angular.module('myApp.orgsUsers', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/orgs/orgsUsers', {
  templateUrl: 'views/orgs/orgsUsers/orgsUsers.html',
    controller: 'orgsUsersCtrl'
  });
}])
.controller('orgsUsersCtrl',
		[ '$scope', 'orgsUsersApi', '$location', 'orgsUsersSelectionSvc', '$timeout',  'orgsSelectionSvc' , 
			function($scope, orgsUsersApi, $location, orgsUsersSelectionSvc, $timeout  , orgsSelectionSvc  ) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				let id = orgsSelectionSvc.getorgs();
				console.log(id);
				$scope.orgsUsers = orgsUsersApi.query({ orgid: id.id });
				
				$scope.orgsUsersSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.orgsUsersGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					enableSelectAll: true,
					exporterMenuPdf: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					exporterCsvFilename: 'users.csv',
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
						{ name:'Uid', field:'uid'/*, visible: */, enableCellEdit: ('uid'=='id' || 'uid'=='uid' || 'uid'=='gid')? false: true},
						{ name:'Devices', field:'devices'/*, visible: */, enableCellEdit: ('devices'=='id' || 'devices'=='uid' || 'devices'=='gid')? false: true},
						{ name:'Tags', field:'tags'/*, visible: */, enableCellEdit: ('tags'=='id' || 'tags'=='uid' || 'tags'=='gid')? false: true},
						{ name:'Org', field:'org'/*, visible: */, enableCellEdit: ('org'=='id' || 'org'=='uid' || 'org'=='gid')? false: true},
						{ name:'Usergrps', field:'usergrps'/*, visible: */, enableCellEdit: ('usergrps'=='id' || 'usergrps'=='uid' || 'usergrps'=='gid')? false: true},
						{ name:'Home Site', field:'home_site'/*, visible: */, enableCellEdit: ('home_site'=='id' || 'home_site'=='uid' || 'home_site'=='gid')? false: true},
						{ name:'Name', field:'name'/*, visible: */, enableCellEdit: ('name'=='id' || 'name'=='uid' || 'name'=='gid')? false: true},
						{ name:'Username', field:'username'/*, visible: */, enableCellEdit: ('username'=='id' || 'username'=='uid' || 'username'=='gid')? false: true},
						{ name:'Email', field:'email'/*, visible: */, enableCellEdit: ('email'=='id' || 'email'=='uid' || 'email'=='gid')? false: true},
						{ name:'Mobile', field:'mobile'/*, visible: */, enableCellEdit: ('mobile'=='id' || 'mobile'=='uid' || 'mobile'=='gid')? false: true},
						{ name:'Endpoints', field:'endpoints'/*, visible: */, enableCellEdit: ('endpoints'=='id' || 'endpoints'=='uid' || 'endpoints'=='gid')? false: true},
					],
					data: $scope.orgsUsers,
						rowTemplate: '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					orgsUsersApi.save({ orgid: id.id }, newObject).$promise.then(function(data){
    						$scope.orgsUsers.push(data);
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
							req['userid'] = rowEntity.id;
            				orgsUsersApi.update(req, rowEntity).$promise.then(function(success){
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
                					$scope.orgsUsersSelected = row.entity;
							$scope.showSelectedRecord = true;
							//console.log(row.entity);	
							orgsUsersSelectionSvc.setorgsUsers(row.entity);
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.orgsUsersSelected = undefined;
				}
				
				$scope.deleteRow = function(row) {
					$scope.stopped = $timeout.cancel($scope.clicked);
					console.log('Deleting ' + row.entity.id);	
					let req = { };
					req['userid'] = row.entity.id;
					orgsUsersApi.delete(req).$promise.then(function(success){
						for (let i=0; i<$scope.orgsUsers.length; i++){
							if ($scope.orgsUsers[i].id == row.entity.id) {
								$scope.orgsUsers.splice(i, 1);
								refresh();
								break;
							}
						}
					}, function(error){
						console.log(error);
					});

				}
				
				$scope.orgsUsersFields = [
						{key: 'id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'id', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'uid', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'uid', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'devices', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'devices', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'tags', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'tags', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'usergrps', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'usergrps', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'home_site', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'home_site', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'name', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'name', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'username', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'username', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'email', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'email', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'mobile', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'mobile', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'endpoints', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'endpoints', placeholder: "", disabled: true/*, required: */ 
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
					
					var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent("devices,tags,org,usergrps,home_site,name,username,email,mobile,endpoints\n");
					var dlAnchorElem = document.getElementById('download');
					dlAnchorElem.setAttribute("href",     dataStr     );
					dlAnchorElem.setAttribute("download", "users.csv");
							
				$scope.closeResults = function(){
					$scope.showUploadResults = false;
				};
}]);