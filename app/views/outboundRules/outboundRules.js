'use strict';
angular.module('myApp.outboundRules', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/outbound_rules', {
  	templateUrl: 'views/outboundRules/outboundRules.html',
    controller: 'outboundRulesCtrl'
  });
}])
.controller('outboundRulesCtrl',
		[ '$scope', 'outboundRulesApi', '$location', 'outboundRulesSelectionSvc', '$timeout', 
			function($scope, outboundRulesApi, $location, outboundRulesSelectionSvc, $timeout  ) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				$scope.outboundRules = outboundRulesApi.query();
				
				$scope.outboundRulesSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.outboundRulesGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					enableSelectAll: true,
					exporterMenuPdf: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					exporterCsvFilename: ':ruleid.csv',
					exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
					rowHeight: 40,
					columnDefs: [
					{ name: 'delete',
					  cellTemplate: '<a id="delete" class="btn btn-danger" role="button" ng-click="grid.appScope.deleteRow(row)"> <span class="glyphicon glyphicon-trash"></span></a>'
					},
						{ name:'Id', field:'id'/*, visible: */, enableCellEdit: ('id'=='id' || 'id'=='uid' || 'id'=='gid')? false: true},
						{ name:'Org', field:'org'/*, visible: */, enableCellEdit: ('org'=='id' || 'org'=='uid' || 'org'=='gid')? false: true},
						{ name:'Users', field:'users'/*, visible: */, enableCellEdit: ('users'=='id' || 'users'=='uid' || 'users'=='gid')? false: true},
						{ name:'Active', field:'active'/*, visible: */, enableCellEdit: ('active'=='id' || 'active'=='uid' || 'active'=='gid')? false: true},
						{ name:'Devices', field:'devices'/*, visible: */, enableCellEdit: ('devices'=='id' || 'devices'=='uid' || 'devices'=='gid')? false: true},
						{ name:'Zones', field:'zones'/*, visible: */, enableCellEdit: ('zones'=='id' || 'zones'=='uid' || 'zones'=='gid')? false: true},
						{ name:'Apps', field:'apps'/*, visible: */, enableCellEdit: ('apps'=='id' || 'apps'=='uid' || 'apps'=='gid')? false: true},
						{ name:'Srctype', field:'srctype'/*, visible: */, enableCellEdit: ('srctype'=='id' || 'srctype'=='uid' || 'srctype'=='gid')? false: true},
						{ name:'Dsttype', field:'dsttype'/*, visible: */, enableCellEdit: ('dsttype'=='id' || 'dsttype'=='uid' || 'dsttype'=='gid')? false: true},
						{ name:'Tags', field:'tags'/*, visible: */, enableCellEdit: ('tags'=='id' || 'tags'=='uid' || 'tags'=='gid')? false: true},
						{ name:'Allow', field:'allow'/*, visible: */, enableCellEdit: ('allow'=='id' || 'allow'=='uid' || 'allow'=='gid')? false: true},
						{ name:'Usergrps', field:'usergrps'/*, visible: */, enableCellEdit: ('usergrps'=='id' || 'usergrps'=='uid' || 'usergrps'=='gid')? false: true},
						{ name:'Devgrps', field:'devgrps'/*, visible: */, enableCellEdit: ('devgrps'=='id' || 'devgrps'=='uid' || 'devgrps'=='gid')? false: true},
						{ name:'Appgrps', field:'appgrps'/*, visible: */, enableCellEdit: ('appgrps'=='id' || 'appgrps'=='uid' || 'appgrps'=='gid')? false: true},
					],
					data: $scope.outboundRules,
						rowTemplate: '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					outboundRulesApi.save(newObject).$promise.then(function(data){
    						$scope.outboundRules.push(data);
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
							req['ruleid'] = rowEntity.id;
            				outboundRulesApi.update(req, rowEntity).$promise.then(function(success){
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
                					$scope.outboundRulesSelected = row.entity;
							$scope.showSelectedRecord = true;
							//console.log(row.entity);	
							outboundRulesSelectionSvc.setoutboundRules(row.entity);
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.outboundRulesSelected = undefined;
				}
				
				$scope.deleteRow = function(row) {
					$scope.stopped = $timeout.cancel($scope.clicked);
					console.log('Deleting ' + row.entity.id);	
					let req = { };
					req['ruleid'] = row.entity.id;
					outboundRulesApi.delete(req).$promise.then(function(success){
						for (let i=0; i<$scope.outboundRules.length; i++){
							if ($scope.outboundRules[i].id == row.entity.id) {
								$scope.outboundRules.splice(i, 1);
								refresh();
								break;
							}
						}
					}, function(error){
						console.log(error);
					});

				}
				
				$scope.outboundRulesFields = [
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
						{key: 'users', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'users', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'active', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'active', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'devices', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'devices', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'zones', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'zones', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'apps', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'apps', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'srctype', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'srctype', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'dsttype', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'dsttype', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'tags', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'tags', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'allow', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'allow', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'usergrps', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'usergrps', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'devgrps', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'devgrps', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'appgrps', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'appgrps', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
				];
}]);