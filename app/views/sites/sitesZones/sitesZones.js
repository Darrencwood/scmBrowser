'use strict';
angular.module('myApp.sitesZones', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/sites/sitesZones', {
  templateUrl: 'views/sites/sitesZones/sitesZones.html',
    controller: 'sitesZonesCtrl'
  });
}])
.controller('sitesZonesCtrl',
		[ '$scope', 'sitesZonesApi', '$location', 'sitesZonesSelectionSvc', '$timeout',  'sitesSelectionSvc' , 
			function($scope, sitesZonesApi, $location, sitesZonesSelectionSvc, $timeout  , sitesSelectionSvc  ) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				let id = sitesSelectionSvc.getsites();
				console.log(id);
				$scope.sitesZones = sitesZonesApi.query({ siteid: id.id });
				
				$scope.sitesZonesSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.sitesZonesGridOptions = {
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
						{ name:'Org', field:'org'/*, visible: */, enableCellEdit: ('org'=='id' || 'org'=='uid' || 'org'=='gid')? false: true},
						{ name:'Name', field:'name'/*, visible: */, enableCellEdit: ('name'=='id' || 'name'=='uid' || 'name'=='gid')? false: true},
						{ name:'Site', field:'site'/*, visible: */, enableCellEdit: ('site'=='id' || 'site'=='uid' || 'site'=='gid')? false: true},
						{ name:'Networks', field:'networks'/*, visible: */, enableCellEdit: ('networks'=='id' || 'networks'=='uid' || 'networks'=='gid')? false: true},
						{ name:'Mgmt', field:'mgmt'/*, visible: */, enableCellEdit: ('mgmt'=='id' || 'mgmt'=='uid' || 'mgmt'=='gid')? false: true},
						{ name:'Icmp', field:'icmp'/*, visible: */, enableCellEdit: ('icmp'=='id' || 'icmp'=='uid' || 'icmp'=='gid')? false: true},
						{ name:'Guest', field:'guest'/*, visible: */, enableCellEdit: ('guest'=='id' || 'guest'=='uid' || 'guest'=='gid')? false: true},
						{ name:'Breakout Preference', field:'breakout_preference'/*, visible: */, enableCellEdit: ('breakout_preference'=='id' || 'breakout_preference'=='uid' || 'breakout_preference'=='gid')? false: true},
						{ name:'Routes', field:'routes'/*, visible: */, enableCellEdit: ('routes'=='id' || 'routes'=='uid' || 'routes'=='gid')? false: true},
						{ name:'Bcasts', field:'bcasts'/*, visible: */, enableCellEdit: ('bcasts'=='id' || 'bcasts'=='uid' || 'bcasts'=='gid')? false: true},
						{ name:'Tag', field:'tag'/*, visible: */, enableCellEdit: ('tag'=='id' || 'tag'=='uid' || 'tag'=='gid')? false: true},
						{ name:'Tags', field:'tags'/*, visible: */, enableCellEdit: ('tags'=='id' || 'tags'=='uid' || 'tags'=='gid')? false: true},
					],
					data: $scope.sitesZones,
						rowTemplate: '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					sitesZonesApi.save({ siteid: id.id }, newObject).$promise.then(function(data){
    						$scope.sitesZones.push(data);
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
							req['zoneid'] = rowEntity.id;
            				sitesZonesApi.update(req, rowEntity);
          				});
    					}
				};
  			     
				$scope.click = function(row){ 
					$scope.clicked = $timeout(function(){
						if ($scope.stopped == false){
                					$scope.sitesZonesSelected = row.entity;
							$scope.showSelectedRecord = true;
							//console.log(row.entity);	
							sitesZonesSelectionSvc.setsitesZones(row.entity);
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.sitesZonesSelected = undefined;
				}
				
				$scope.deleteRow = function(row) {
					$scope.stopped = $timeout.cancel($scope.clicked);
					console.log('Deleting ' + row.entity.id);	
					let req = { };
					req['zoneid'] = row.entity.id;
					sitesZonesApi.delete(req).$promise.then(function(success){
						for (let i=0; i<$scope.sitesZones.length; i++){
							if ($scope.sitesZones[i].id == row.entity.id) {
								$scope.sitesZones.splice(i, 1);
								refresh();
								break;
							}
						}
					}, function(error){
						console.log(error);
					});

				}
				
				$scope.sitesZonesFields = [
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
						{key: 'name', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'name', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'site', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'site', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'networks', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'networks', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'mgmt', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'mgmt', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'icmp', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'icmp', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'guest', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'guest', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'breakout_preference', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'breakout_preference', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'routes', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'routes', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'bcasts', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'bcasts', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'tag', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'tag', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'tags', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'tags', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
				];
}]);