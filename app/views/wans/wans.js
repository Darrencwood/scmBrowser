'use strict';
angular.module('myApp.wans', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/wans', {
  	templateUrl: 'views/wans/wans.html',
    controller: 'wansCtrl'
  });
}])
.controller('wansCtrl',
		[ '$scope', 'wansApi', '$location', 'wansSelectionSvc', '$timeout', 
			function($scope, wansApi, $location, wansSelectionSvc, $timeout  ) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				$scope.wans = wansApi.query();
				
				$scope.wansSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.wansGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					enableSelectAll: true,
					exporterMenuPdf: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					exporterCsvFilename: ':wanid.csv',
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
					data: $scope.wans,
						rowTemplate: '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					wansApi.save(newObject).$promise.then(function(data){
    						$scope.wans.push(data);
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
            				wansApi.update(req, rowEntity).$promise.then(function(success){
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
                					$scope.wansSelected = row.entity;
							$scope.showSelectedRecord = true;
							//console.log(row.entity);	
							wansSelectionSvc.setwans(row.entity);
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.wansSelected = undefined;
				}
				
				$scope.deleteRow = function(row) {
					$scope.stopped = $timeout.cancel($scope.clicked);
					console.log('Deleting ' + row.entity.id);	
					let req = { };
					req['wanid'] = row.entity.id;
					wansApi.delete(req).$promise.then(function(success){
						for (let i=0; i<$scope.wans.length; i++){
							if ($scope.wans[i].id == row.entity.id) {
								$scope.wans.splice(i, 1);
								refresh();
								break;
							}
						}
					}, function(error){
						console.log(error);
					});

				}
				
				$scope.wansFields = [
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
}]);