'use strict';
angular.module('myApp.devices', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/devices', {
  	templateUrl: 'views/devices/devices.html',
    controller: 'devicesCtrl'
  });
}])
.controller('devicesCtrl',
		[ '$scope', 'devicesApi', '$location', 'devicesSelectionSvc', '$timeout', 
			function($scope, devicesApi, $location, devicesSelectionSvc, $timeout  ) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				$scope.devices = devicesApi.query();
				
				$scope.devicesSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.devicesGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					rowHeight: 40,
					columnDefs: [
					{ name: 'delete',
					  cellTemplate: '<a id="delete" class="btn btn-danger" role="button" ng-click="grid.appScope.deleteRow(row)"> <span class="glyphicon glyphicon-trash"></span></a>'
					},
						{ name:'Id', field:'id'/*, visible: */, enableCellEdit: ('id'=='id' || 'id'=='uid' || 'id'=='gid')? false: true},
						{ name:'Uid', field:'uid'/*, visible: */, enableCellEdit: ('uid'=='id' || 'uid'=='uid' || 'uid'=='gid')? false: true},
						{ name:'User', field:'user'/*, visible: */, enableCellEdit: ('user'=='id' || 'user'=='uid' || 'user'=='gid')? false: true},
						{ name:'Mac', field:'mac'/*, visible: */, enableCellEdit: ('mac'=='id' || 'mac'=='uid' || 'mac'=='gid')? false: true},
						{ name:'Info', field:'info'/*, visible: */, enableCellEdit: ('info'=='id' || 'info'=='uid' || 'info'=='gid')? false: true},
						{ name:'Ipv4', field:'ipv4'/*, visible: */, enableCellEdit: ('ipv4'=='id' || 'ipv4'=='uid' || 'ipv4'=='gid')? false: true},
						{ name:'Ipv6', field:'ipv6'/*, visible: */, enableCellEdit: ('ipv6'=='id' || 'ipv6'=='uid' || 'ipv6'=='gid')? false: true},
						{ name:'Org', field:'org'/*, visible: */, enableCellEdit: ('org'=='id' || 'org'=='uid' || 'org'=='gid')? false: true},
						{ name:'Devgrps', field:'devgrps'/*, visible: */, enableCellEdit: ('devgrps'=='id' || 'devgrps'=='uid' || 'devgrps'=='gid')? false: true},
						{ name:'Tags', field:'tags'/*, visible: */, enableCellEdit: ('tags'=='id' || 'tags'=='uid' || 'tags'=='gid')? false: true},
						{ name:'Net', field:'net'/*, visible: */, enableCellEdit: ('net'=='id' || 'net'=='uid' || 'net'=='gid')? false: true},
						{ name:'Endpoint', field:'endpoint'/*, visible: */, enableCellEdit: ('endpoint'=='id' || 'endpoint'=='uid' || 'endpoint'=='gid')? false: true},
					],
					data: $scope.devices,
						rowTemplate: '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					devicesApi.save(newObject).$promise.then(function(data){
    						$scope.devices.push(data);
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
							req['devid'] = rowEntity.id;
            				devicesApi.update(req, rowEntity);
          				});
    					}
				};
  			     
				$scope.click = function(row){ 
					$scope.clicked = $timeout(function(){
						if ($scope.stopped == false){
                					$scope.devicesSelected = row.entity;
							$scope.showSelectedRecord = true;
							//console.log(row.entity);	
							devicesSelectionSvc.setdevices(row.entity);
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.devicesSelected = undefined;
				}
				
				$scope.deleteRow = function(row) {
					$scope.stopped = $timeout.cancel($scope.clicked);
					console.log('Deleting ' + row.entity.id);	
					let req = { };
					req['devid'] = row.entity.id;
					devicesApi.delete(req).$promise.then(function(success){
						for (let i=0; i<$scope.devices.length; i++){
							if ($scope.devices[i].id == row.entity.id) {
								$scope.devices.splice(i, 1);
								refresh();
								break;
							}
						}
					}, function(error){
						console.log(error);
					});

				}
				
				$scope.devicesFields = [
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
						{key: 'user', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'user', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'mac', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'mac', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'info', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'info', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'ipv4', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'ipv4', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'ipv6', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'ipv6', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'devgrps', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'devgrps', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'tags', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'tags', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'net', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'net', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'endpoint', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'endpoint', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
				];
}]);