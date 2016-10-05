'use strict';

angular.module('myApp.Pathrules', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/path_rules', {
    templateUrl: 'views/path_rules/path_rules.html',
    controller: 'PathrulesCtrl'
  });
}])
.controller('PathrulesCtrl',
		[ '$scope', 'apiPathrules', '$location', 'currentPathrules', '$timeout',
			function($scope, apiPathrules, $location, currentPathrules, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.Pathrules = apiPathrules.query();
				$scope.PathrulesSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.PathrulesGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'dsttype', field:'dsttype'/*, visible: */},
						{ name:'qos', field:'qos'/*, visible: */},
						{ name:'id', field:'id'/*, visible: */},
						{ name:'marking', field:'marking'/*, visible: */},
						{ name:'zones', field:'zones'/*, visible: */},
						{ name:'srctype', field:'srctype'/*, visible: */},
						{ name:'uid', field:'uid'/*, visible: */},
						{ name:'active', field:'active'/*, visible: */},
						{ name:'sites', field:'sites'/*, visible: */},
						{ name:'path_preference', field:'path_preference'/*, visible: */},
						{ name:'org', field:'org'/*, visible: */},
						{ name:'dscp', field:'dscp'/*, visible: */},
						{ name:'apps', field:'apps'/*, visible: */},
						{ name:'devices', field:'devices'/*, visible: */},
						{ name:'tags', field:'tags'/*, visible: */},
						{ name:'users', field:'users'/*, visible: */},
					],
					data: $scope.Pathrules,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					apiPathrules.save(newObject).$promise.then(function(data){
    						$scope.Pathrules.push(data);
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
                			$scope.PathrulesSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        			},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.PathrulesSelected = undefined;
				}
				
				$scope.PathrulesFields = [
						{key: 'dsttype', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'dsttype', placeholder: "dsttype", required: false
            				}
          				},
						{key: 'qos', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'qos', placeholder: "qos", required: false
            				}
          				},
						{key: 'id', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'id', placeholder: "id", required: false
            				}
          				},
						{key: 'marking', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'marking', placeholder: "marking", required: false
            				}
          				},
						{key: 'zones', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'zones', placeholder: "zones", required: false
            				}
          				},
						{key: 'srctype', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'srctype', placeholder: "srctype", required: false
            				}
          				},
						{key: 'uid', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'uid', placeholder: "uid", required: false
            				}
          				},
						{key: 'active', type: 'input',
            				templateOptions: {
                				type: 'boolean', label: 'active', placeholder: "active", required: false
            				}
          				},
						{key: 'sites', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'sites', placeholder: "sites", required: false
            				}
          				},
						{key: 'path_preference', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'path_preference', placeholder: "path_preference", required: false
            				}
          				},
						{key: 'org', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'org', placeholder: "org", required: false
            				}
          				},
						{key: 'dscp', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'dscp', placeholder: "dscp", required: false
            				}
          				},
						{key: 'apps', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'apps', placeholder: "apps", required: false
            				}
          				},
						{key: 'devices', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'devices', placeholder: "devices", required: false
            				}
          				},
						{key: 'tags', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'tags', placeholder: "tags", required: false
            				}
          				},
						{key: 'users', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'users', placeholder: "users", required: false
            				}
          				},
				];
		}]
)
;