'use strict';
angular.module('myApp.sitesZones', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/sitesZones', {
    templateUrl: 'views/sitesZones/sitesZones.html',
    controller: 'sitesZonesCtrl'
  });
}])
.controller('sitesZonesCtrl',
		[ '$scope', 'sitesZonesApi', '$location', 'sitesZonesSelectionSvc', '$timeout',
			function($scope, sitesZonesApi, $location, sitesZonesSelectionSvc, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.sitesZones = sitesZonesApi.query();
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
					columnDefs: [
						{ name:'Id', field:'id'/*, visible: */},
						{ name:'Org', field:'org'/*, visible: */},
						{ name:'Name', field:'name'/*, visible: */},
						{ name:'Site', field:'site'/*, visible: */},
						{ name:'Networks', field:'networks'/*, visible: */},
						{ name:'Mgmt', field:'mgmt'/*, visible: */},
						{ name:'Icmp', field:'icmp'/*, visible: */},
						{ name:'Guest', field:'guest'/*, visible: */},
						{ name:'Breakout Preference', field:'breakout_preference'/*, visible: */},
						{ name:'Routes', field:'routes'/*, visible: */},
						{ name:'Bcasts', field:'bcasts'/*, visible: */},
						{ name:'Tag', field:'tag'/*, visible: */},
						{ name:'Tags', field:'tags'/*, visible: */},
					],
					data: $scope.sitesZones,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					sitesZonesApi.save(newObject).$promise.then(function(data){
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
      						//$scope.gridApi.rowEdit.on.saveRow($scope,
      						//$scope.saveRow);
    					}
				};
  			     
				$scope.click = function(row){ 
					$scope.clicked = $timeout(function(){
						if ($scope.stopped == false){
                					$scope.sitesZonesSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.sitesZonesSelected = undefined;
				}
				
				$scope.sitesZonesFields = [
						{key: 'id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'id', placeholder: ""/*, required: */
            					}
          				},
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: ""/*, required: */
            					}
          				},
						{key: 'name', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'name', placeholder: ""/*, required: */
            					}
          				},
						{key: 'site', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'site', placeholder: ""/*, required: */
            					}
          				},
						{key: 'networks', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'networks', placeholder: ""/*, required: */
            					}
          				},
						{key: 'mgmt', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'mgmt', placeholder: ""/*, required: */
            					}
          				},
						{key: 'icmp', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'icmp', placeholder: ""/*, required: */
            					}
          				},
						{key: 'guest', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'guest', placeholder: ""/*, required: */
            					}
          				},
						{key: 'breakout_preference', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'breakout_preference', placeholder: ""/*, required: */
            					}
          				},
						{key: 'routes', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'routes', placeholder: ""/*, required: */
            					}
          				},
						{key: 'bcasts', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'bcasts', placeholder: ""/*, required: */
            					}
          				},
						{key: 'tag', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'tag', placeholder: ""/*, required: */
            					}
          				},
						{key: 'tags', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'tags', placeholder: ""/*, required: */
            					}
          				},
				];
}]);