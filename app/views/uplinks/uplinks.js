'use strict';

angular.module('myApp.Uplinks', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/uplinks', {
    templateUrl: 'views/uplinks/uplinks.html',
    controller: 'UplinksCtrl'
  });
}])
.controller('UplinksCtrl',
		[ '$scope', 'apiUplinks', '$location', 'currentUplinks', '$timeout',
			function($scope, apiUplinks, $location, currentUplinks, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.Uplinks = apiUplinks.query();
				$scope.UplinksSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.UplinksGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'org', field:'org'/*, visible: */},
						{ name:'qos_bw_up', field:'qos_bw_up'/*, visible: */},
						{ name:'qos_up', field:'qos_up'/*, visible: */},
						{ name:'site', field:'site'/*, visible: */},
						{ name:'static_ip_v6', field:'static_ip_v6'/*, visible: */},
						{ name:'uin', field:'uin'/*, visible: */},
						{ name:'uid', field:'uid'/*, visible: */},
						{ name:'node', field:'node'/*, visible: */},
						{ name:'name', field:'name'/*, visible: */},
						{ name:'static_gw_v4', field:'static_gw_v4'/*, visible: */},
						{ name:'id', field:'id'/*, visible: */},
						{ name:'wan', field:'wan'/*, visible: */},
						{ name:'static_gw_v6', field:'static_gw_v6'/*, visible: */},
						{ name:'qos_bw_down', field:'qos_bw_down'/*, visible: */},
						{ name:'qos_down', field:'qos_down'/*, visible: */},
						{ name:'static_ip_v4', field:'static_ip_v4'/*, visible: */},
						{ name:'port', field:'port'/*, visible: */},
						{ name:'vlan', field:'vlan'/*, visible: */},
						{ name:'type', field:'type'/*, visible: */},
					],
					data: $scope.Uplinks,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					apiUplinks.save(newObject).$promise.then(function(data){
    						$scope.Uplinks.push(data);
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
                			$scope.UplinksSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        			},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.UplinksSelected = undefined;
				}
				
				$scope.UplinksFields = [
						{key: 'org', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'org', placeholder: "org", required: false
            				}
          				},
						{key: 'qos_bw_up', type: 'input',
            				templateOptions: {
                				type: 'integer', label: 'qos_bw_up', placeholder: "bw_up", required: false
            				}
          				},
						{key: 'qos_up', type: 'input',
            				templateOptions: {
                				type: 'integer', label: 'qos_up', placeholder: "qos_up", required: false
            				}
          				},
						{key: 'site', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'site', placeholder: "site", required: false
            				}
          				},
						{key: 'static_ip_v6', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'static_ip_v6', placeholder: "static_ip_v6", required: false
            				}
          				},
						{key: 'uin', type: 'input',
            				templateOptions: {
                				type: 'integer', label: 'uin', placeholder: "uin", required: false
            				}
          				},
						{key: 'uid', type: 'input',
            				templateOptions: {
                				type: 'integer', label: 'uid', placeholder: "uid", required: false
            				}
          				},
						{key: 'node', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'node', placeholder: "node", required: false
            				}
          				},
						{key: 'name', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'name', placeholder: "name", required: false
            				}
          				},
						{key: 'static_gw_v4', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'static_gw_v4', placeholder: "static_gw_v4", required: false
            				}
          				},
						{key: 'id', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'id', placeholder: "id", required: false
            				}
          				},
						{key: 'wan', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'wan', placeholder: "wan", required: false
            				}
          				},
						{key: 'static_gw_v6', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'static_gw_v6', placeholder: "static_gw_v6", required: false
            				}
          				},
						{key: 'qos_bw_down', type: 'input',
            				templateOptions: {
                				type: 'integer', label: 'qos_bw_down', placeholder: "bw_down", required: false
            				}
          				},
						{key: 'qos_down', type: 'input',
            				templateOptions: {
                				type: 'integer', label: 'qos_down', placeholder: "qos_down", required: false
            				}
          				},
						{key: 'static_ip_v4', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'static_ip_v4', placeholder: "static_ip_v4", required: false
            				}
          				},
						{key: 'port', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'port', placeholder: "port", required: false
            				}
          				},
						{key: 'vlan', type: 'input',
            				templateOptions: {
                				type: 'integer', label: 'vlan', placeholder: "vlan", required: false
            				}
          				},
						{key: 'type', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'type', placeholder: "type", required: false
            				}
          				},
				];
		}]
)
;