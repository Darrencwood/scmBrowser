'use strict';
angular.module('myApp.users', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/users', {
  	templateUrl: 'views/users/users.html',
    controller: 'usersCtrl'
  });
}])
.controller('usersCtrl',
		[ '$scope', 'usersApi', '$location', 'usersSelectionSvc', '$timeout', 
			function($scope, usersApi, $location, usersSelectionSvc, $timeout  ) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				$scope.users = usersApi.query();
				$scope.usersSelected = '';
				
				
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.usersGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					enableSelectAll: true,
					multiSelect: false,
					modifierKeysToMultiSelect: false,
					noUnselect: true,
					exporterMenuPdf: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					exporterCsvFilename: ':userid.csv',
					exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
					rowHeight: 40,
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
					data: $scope.users,
						rowTemplate: '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					usersApi.save(newObject).$promise.then(function(data){
    						$scope.users.push(data);
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
            				usersApi.update(req, rowEntity).$promise.then(function(success){
            					// Do nothing , we already updated the table.
            				}, function(error){
            					// TODO: Rollback change.
            				});
          				});
          				gridApi.selection.on.rowSelectionChanged($scope,function(row){
        					console.log('row selected ' + row.entity.id);
        					usersSelectionSvc.setusers(row.entity);
        					$scope.usersSelected = row.entity;
							$scope.showSelectedRecord = true;
      					});
    					}
				};
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.usersSelected = undefined;
				}
				
				$scope.deleteRow = function(row) {
					$scope.stopped = $timeout.cancel($scope.clicked);
					console.log('Deleting ' + row.entity.id);	
					let req = { };
					req['userid'] = row.entity.id;
					usersApi.delete(req).$promise.then(function(success){
						for (let i=0; i<$scope.users.length; i++){
							if ($scope.users[i].id == row.entity.id) {
								$scope.users.splice(i, 1);
								refresh();
								break;
							}
						}
					}, function(error){
						console.log(error);
					});

				}
				
				$scope.usersFields = [
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
}]);