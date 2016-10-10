'use strict';
angular.module('myApp.zones', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/zones', {
    templateUrl: 'views/zones/zones.html',
    controller: 'zonesCtrl'
  });
}])
.controller('zonesCtrl',
		[ '$scope', 'zonesApi', '$location', 'zonesSelectionSvc', '$timeout',
			function($scope, zonesApi, $location, zonesSelectionSvc, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.zones = zonesApi.query();
				$scope.zonesSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.zonesGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					rowHeight: 40,
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
					data: $scope.zones,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					zonesApi.save(newObject).$promise.then(function(data){
    						$scope.zones.push(data);
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
                					$scope.zonesSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.zonesSelected = undefined;
				}
				
				$scope.zonesFields = [
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