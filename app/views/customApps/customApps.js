'use strict';
angular.module('myApp.customApps', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/customApps', {
    templateUrl: 'views/customApps/customApps.html',
    controller: 'customAppsCtrl'
  });
}])
.controller('customAppsCtrl',
		[ '$scope', 'customAppsApi', '$location', 'customAppsSelectionSvc', '$timeout',
			function($scope, customAppsApi, $location, customAppsSelectionSvc, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.customApps = customAppsApi.query();
				$scope.customAppsSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.customAppsGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					rowHeight: 40,
					columnDefs: [
						{ name:'Id', field:'id'/*, visible: */},
						{ name:'Appid', field:'appid'/*, visible: */},
						{ name:'Desc', field:'desc'/*, visible: */},
						{ name:'Name', field:'name'/*, visible: */},
						{ name:'Appgrps', field:'appgrps'/*, visible: */},
						{ name:'Devgrp', field:'devgrp'/*, visible: */},
						{ name:'Org', field:'org'/*, visible: */},
						{ name:'Dnats', field:'dnats'/*, visible: */},
						{ name:'Device Proto', field:'device_proto'/*, visible: */},
						{ name:'Type', field:'type'/*, visible: */},
						{ name:'Internal', field:'internal'/*, visible: */},
						{ name:'Ipport', field:'ipport'/*, visible: */},
						{ name:'Httphost', field:'httphost'/*, visible: */},
						{ name:'Device', field:'device'/*, visible: */},
						{ name:'Segments', field:'segments'/*, visible: */},
						{ name:'Device Ports', field:'device_ports'/*, visible: */},
						{ name:'Uid', field:'uid'/*, visible: */},
					],
					data: $scope.customApps,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					customAppsApi.save(newObject).$promise.then(function(data){
    						$scope.customApps.push(data);
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
                					$scope.customAppsSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.customAppsSelected = undefined;
				}
				
				$scope.customAppsFields = [
						{key: 'id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'id', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'appid', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'appid', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'desc', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'desc', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'name', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'name', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'appgrps', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'appgrps', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'devgrp', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'devgrp', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'dnats', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'dnats', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'device_proto', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'device_proto', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'type', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'type', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'internal', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'internal', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'ipport', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'ipport', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'httphost', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'httphost', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'device', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'device', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'segments', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'segments', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'device_ports', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'device_ports', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'uid', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'uid', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
				];
}]);