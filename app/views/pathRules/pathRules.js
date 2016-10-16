'use strict';
angular.module('myApp.pathRules', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/path_rules', {
  	templateUrl: 'views/pathRules/pathRules.html',
    controller: 'pathRulesCtrl'
  });
}])
.controller('pathRulesCtrl',
		[ '$scope', 'pathRulesApi', '$location', 'pathRulesSelectionSvc', '$timeout', 
			function($scope, pathRulesApi, $location, pathRulesSelectionSvc, $timeout  ) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				$scope.pathRules = pathRulesApi.query();
				
				$scope.pathRulesSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.pathRulesGridOptions = {
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
						{ name:'Dsttype', field:'dsttype'/*, visible: */, enableCellEdit: ('dsttype'=='id' || 'dsttype'=='uid' || 'dsttype'=='gid')? false: true},
						{ name:'Qos', field:'qos'/*, visible: */, enableCellEdit: ('qos'=='id' || 'qos'=='uid' || 'qos'=='gid')? false: true},
						{ name:'Id', field:'id'/*, visible: */, enableCellEdit: ('id'=='id' || 'id'=='uid' || 'id'=='gid')? false: true},
						{ name:'Marking', field:'marking'/*, visible: */, enableCellEdit: ('marking'=='id' || 'marking'=='uid' || 'marking'=='gid')? false: true},
						{ name:'Zones', field:'zones'/*, visible: */, enableCellEdit: ('zones'=='id' || 'zones'=='uid' || 'zones'=='gid')? false: true},
						{ name:'Srctype', field:'srctype'/*, visible: */, enableCellEdit: ('srctype'=='id' || 'srctype'=='uid' || 'srctype'=='gid')? false: true},
						{ name:'Uid', field:'uid'/*, visible: */, enableCellEdit: ('uid'=='id' || 'uid'=='uid' || 'uid'=='gid')? false: true},
						{ name:'Active', field:'active'/*, visible: */, enableCellEdit: ('active'=='id' || 'active'=='uid' || 'active'=='gid')? false: true},
						{ name:'Sites', field:'sites'/*, visible: */, enableCellEdit: ('sites'=='id' || 'sites'=='uid' || 'sites'=='gid')? false: true},
						{ name:'Path Preference', field:'path_preference'/*, visible: */, enableCellEdit: ('path_preference'=='id' || 'path_preference'=='uid' || 'path_preference'=='gid')? false: true},
						{ name:'Org', field:'org'/*, visible: */, enableCellEdit: ('org'=='id' || 'org'=='uid' || 'org'=='gid')? false: true},
						{ name:'Dscp', field:'dscp'/*, visible: */, enableCellEdit: ('dscp'=='id' || 'dscp'=='uid' || 'dscp'=='gid')? false: true},
						{ name:'Apps', field:'apps'/*, visible: */, enableCellEdit: ('apps'=='id' || 'apps'=='uid' || 'apps'=='gid')? false: true},
						{ name:'Devices', field:'devices'/*, visible: */, enableCellEdit: ('devices'=='id' || 'devices'=='uid' || 'devices'=='gid')? false: true},
						{ name:'Tags', field:'tags'/*, visible: */, enableCellEdit: ('tags'=='id' || 'tags'=='uid' || 'tags'=='gid')? false: true},
						{ name:'Users', field:'users'/*, visible: */, enableCellEdit: ('users'=='id' || 'users'=='uid' || 'users'=='gid')? false: true},
					],
					data: $scope.pathRules,
						rowTemplate: '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					pathRulesApi.save(newObject).$promise.then(function(data){
    						$scope.pathRules.push(data);
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
							req['pruleid'] = rowEntity.id;
            				pathRulesApi.update(req, rowEntity);
          				});
    					}
				};
  			     
				$scope.click = function(row){ 
					$scope.clicked = $timeout(function(){
						if ($scope.stopped == false){
                					$scope.pathRulesSelected = row.entity;
							$scope.showSelectedRecord = true;
							//console.log(row.entity);	
							pathRulesSelectionSvc.setpathRules(row.entity);
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.pathRulesSelected = undefined;
				}
				
				$scope.deleteRow = function(row) {
					$scope.stopped = $timeout.cancel($scope.clicked);
					console.log('Deleting ' + row.entity.id);	
					let req = { };
					req['pruleid'] = row.entity.id;
					pathRulesApi.delete(req).$promise.then(function(success){
						for (let i=0; i<$scope.pathRules.length; i++){
							if ($scope.pathRules[i].id == row.entity.id) {
								$scope.pathRules.splice(i, 1);
								refresh();
								break;
							}
						}
					}, function(error){
						console.log(error);
					});

				}
				
				$scope.pathRulesFields = [
						{key: 'dsttype', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'dsttype', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'qos', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'qos', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'id', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'marking', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'marking', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'zones', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'zones', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'srctype', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'srctype', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'uid', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'uid', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'active', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'active', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'sites', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'sites', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'path_preference', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'path_preference', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'dscp', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'dscp', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'apps', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'apps', placeholder: "", disabled: true/*, required: */ 
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
						{key: 'users', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'users', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
				];
}]);