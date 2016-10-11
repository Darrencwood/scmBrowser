'use strict';
angular.module('myApp.sitesBroadcasts', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/sites/sitesBroadcasts', {
  	templateUrl: 'views/sites/sitesBroadcasts/sitesBroadcasts.html',
    controller: 'sitesBroadcastsCtrl'
  });
}])
.controller('sitesBroadcastsCtrl',
		[ '$scope', 'sitesBroadcastsApi', '$location', 'sitesBroadcastsSelectionSvc', '$timeout',  'sitesSelectionSvc' , 
			function($scope, sitesBroadcastsApi, $location, sitesBroadcastsSelectionSvc, $timeout  , sitesSelectionSvc  ) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				let id = sitesSelectionSvc.getsites();
				console.log(id);
				$scope.sitesBroadcasts = sitesBroadcastsApi.query({ siteid: id.id });
				
				$scope.sitesBroadcastsSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.sitesBroadcastsGridOptions = {
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
						{ name:'Site', field:'site'/*, visible: */},
						{ name:'Zone', field:'zone'/*, visible: */},
						{ name:'Ssid', field:'ssid'/*, visible: */},
						{ name:'Inactive', field:'inactive'/*, visible: */},
						{ name:'Dynzone', field:'dynzone'/*, visible: */},
						{ name:'Portal', field:'portal'/*, visible: */},
						{ name:'Hide Ssid', field:'hide_ssid'/*, visible: */},
						{ name:'Band', field:'band'/*, visible: */},
					],
					data: $scope.sitesBroadcasts,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					sitesBroadcastsApi.save({ siteid: id.id }, newObject).$promise.then(function(data){
    						$scope.sitesBroadcasts.push(data);
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
                					$scope.sitesBroadcastsSelected = row.entity;
							$scope.showSelectedRecord = true;
							console.log(row.entity);	
							sitesBroadcastsSelectionSvc.setsitesBroadcasts(row.entity);
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.sitesBroadcastsSelected = undefined;
				}
				
				$scope.sitesBroadcastsFields = [
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
						{key: 'site', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'site', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'zone', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'zone', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'ssid', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'ssid', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'inactive', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'inactive', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'dynzone', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'dynzone', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'portal', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'portal', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'hide_ssid', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'hide_ssid', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'band', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'band', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
				];
}]);