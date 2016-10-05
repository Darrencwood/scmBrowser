'use strict';

angular.module('myApp.Customapps', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/custom_apps', {
    templateUrl: 'views/custom_apps/custom_apps.html',
    controller: 'CustomappsCtrl'
  });
}])
.controller('CustomappsCtrl',
		[ '$scope', 'apiCustomapps', '$location', 'currentCustomapps', '$timeout',
			function($scope, apiCustomapps, $location, currentCustomapps, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.Customapps = apiCustomapps.query();
				$scope.CustomappsSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.CustomappsGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'id', field:'id'/*, visible: */},
						{ name:'appid', field:'appid'/*, visible: */},
						{ name:'desc', field:'desc'/*, visible: */},
						{ name:'name', field:'name'/*, visible: */},
						{ name:'appgrps', field:'appgrps'/*, visible: */},
						{ name:'devgrp', field:'devgrp'/*, visible: */},
						{ name:'org', field:'org'/*, visible: */},
						{ name:'dnats', field:'dnats'/*, visible: */},
						{ name:'device_proto', field:'device_proto'/*, visible: */},
						{ name:'type', field:'type'/*, visible: */},
						{ name:'internal', field:'internal'/*, visible: */},
						{ name:'ipport', field:'ipport'/*, visible: */},
						{ name:'httphost', field:'httphost'/*, visible: */},
						{ name:'device', field:'device'/*, visible: */},
						{ name:'segments', field:'segments'/*, visible: */},
						{ name:'device_ports', field:'device_ports'/*, visible: */},
						{ name:'uid', field:'uid'/*, visible: */},
					],
					data: $scope.Customapps,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					apiCustomapps.save(newObject).$promise.then(function(data){
    						$scope.Customapps.push(data);
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
                			$scope.CustomappsSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        			},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.CustomappsSelected = undefined;
				}
				
				$scope.CustomappsFields = [
						{key: 'id', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'id', placeholder: "id", required: false
            				}
          				},
						{key: 'appid', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'appid', placeholder: "appid", required: false
            				}
          				},
						{key: 'desc', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'desc', placeholder: "Description", required: false
            				}
          				},
						{key: 'name', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'name', placeholder: "Name", required: false
            				}
          				},
						{key: 'appgrps', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'appgrps', placeholder: "Application groups", required: false
            				}
          				},
						{key: 'devgrp', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'devgrp', placeholder: "Device Group", required: false
            				}
          				},
						{key: 'org', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'org', placeholder: "Organization", required: false
            				}
          				},
						{key: 'dnats', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'dnats', placeholder: "dnats", required: false
            				}
          				},
						{key: 'device_proto', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'device_proto', placeholder: "Protocol", required: false
            				}
          				},
						{key: 'type', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'type', placeholder: "Application type", required: false
            				}
          				},
						{key: 'internal', type: 'input',
            				templateOptions: {
                				type: 'boolean', label: 'internal', placeholder: "Scope", required: false
            				}
          				},
						{key: 'ipport', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'ipport', placeholder: "Specification", required: false
            				}
          				},
						{key: 'httphost', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'httphost', placeholder: "Hostnames", required: false
            				}
          				},
						{key: 'device', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'device', placeholder: "Server Device", required: false
            				}
          				},
						{key: 'segments', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'segments', placeholder: "Zones", required: false
            				}
          				},
						{key: 'device_ports', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'device_ports', placeholder: "Ports", required: false
            				}
          				},
						{key: 'uid', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'uid', placeholder: "Unique integer id", required: false
            				}
          				},
				];
		}]
)
;