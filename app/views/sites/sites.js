'use strict';
angular.module('myApp.sites', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/sites', {
  	templateUrl: 'views/sites/sites.html',
    controller: 'sitesCtrl'
  });
}])
.controller('sitesCtrl',
		[ '$scope', 'sitesApi', '$location', 'sitesSelectionSvc', '$timeout', 
			function($scope, sitesApi, $location, sitesSelectionSvc, $timeout  ) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				$scope.sites = sitesApi.query();
				
				$scope.sitesSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.sitesGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					enableSelectAll: true,
					exporterMenuPdf: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					exporterCsvFilename: ':siteid.csv',
					exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
					rowHeight: 40,
					columnDefs: [
					{ name: 'delete',
					  cellTemplate: '<a id="delete" class="btn btn-danger" role="button" ng-click="grid.appScope.deleteRow(row)"> <span class="glyphicon glyphicon-trash"></span></a>'
					},
						{ name:'Id', field:'id'/*, visible: */, enableCellEdit: ('id'=='id' || 'id'=='uid' || 'id'=='gid')? false: true},
						{ name:'Name', field:'name'/*, visible: */, enableCellEdit: ('name'=='id' || 'name'=='uid' || 'name'=='gid')? false: true},
						{ name:'Org', field:'org'/*, visible: */, enableCellEdit: ('org'=='id' || 'org'=='uid' || 'org'=='gid')? false: true},
						{ name:'Longname', field:'longname'/*, visible: */, enableCellEdit: ('longname'=='id' || 'longname'=='uid' || 'longname'=='gid')? false: true},
						{ name:'Uplinks', field:'uplinks'/*, visible: */, enableCellEdit: ('uplinks'=='id' || 'uplinks'=='uid' || 'uplinks'=='gid')? false: true},
						{ name:'Networks', field:'networks'/*, visible: */, enableCellEdit: ('networks'=='id' || 'networks'=='uid' || 'networks'=='gid')? false: true},
						{ name:'Street Address', field:'street_address'/*, visible: */, enableCellEdit: ('street_address'=='id' || 'street_address'=='uid' || 'street_address'=='gid')? false: true},
						{ name:'City', field:'city'/*, visible: */, enableCellEdit: ('city'=='id' || 'city'=='uid' || 'city'=='gid')? false: true},
						{ name:'Country', field:'country'/*, visible: */, enableCellEdit: ('country'=='id' || 'country'=='uid' || 'country'=='gid')? false: true},
						{ name:'Timezone', field:'timezone'/*, visible: */, enableCellEdit: ('timezone'=='id' || 'timezone'=='uid' || 'timezone'=='gid')? false: true},
						{ name:'Size', field:'size'/*, visible: */, enableCellEdit: ('size'=='id' || 'size'=='uid' || 'size'=='gid')? false: true},
						{ name:'Uid', field:'uid'/*, visible: */, enableCellEdit: ('uid'=='id' || 'uid'=='uid' || 'uid'=='gid')? false: true},
					],
					data: $scope.sites,
						rowTemplate: '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					sitesApi.save(newObject).$promise.then(function(data){
    						$scope.sites.push(data);
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
							req['siteid'] = rowEntity.id;
            				sitesApi.update(req, rowEntity).$promise.then(function(success){
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
                					$scope.sitesSelected = row.entity;
							$scope.showSelectedRecord = true;
							//console.log(row.entity);	
							sitesSelectionSvc.setsites(row.entity);
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
					$scope.stopped = $timeout.cancel($scope.clicked);
					console.log(row.entity);	
					sitesSelectionSvc.setsites(row.entity.id);
					$location.path('/org');
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.sitesSelected = undefined;
				}
				
				$scope.deleteRow = function(row) {
					$scope.stopped = $timeout.cancel($scope.clicked);
					console.log('Deleting ' + row.entity.id);	
					let req = { };
					req['siteid'] = row.entity.id;
					sitesApi.delete(req).$promise.then(function(success){
						for (let i=0; i<$scope.sites.length; i++){
							if ($scope.sites[i].id == row.entity.id) {
								$scope.sites.splice(i, 1);
								refresh();
								break;
							}
						}
					}, function(error){
						console.log(error);
					});

				}
				
				$scope.sitesFields = [
						{key: 'id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'id', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'name', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'name', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'longname', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'longname', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'uplinks', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'uplinks', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'networks', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'networks', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'street_address', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'street_address', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'city', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'city', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'country', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'country', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'timezone', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'timezone', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'size', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'size', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'uid', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'uid', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
				];
}]);