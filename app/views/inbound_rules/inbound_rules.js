'use strict';

angular.module('myApp.Inboundrules', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/inbound_rules', {
    templateUrl: 'views/inbound_rules/inbound_rules.html',
    controller: 'InboundrulesCtrl'
  });
}])
.controller('InboundrulesCtrl',
		[ '$scope', 'apiInboundrules', '$location', 'currentInboundrules', '$timeout',
			function($scope, apiInboundrules, $location, currentInboundrules, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.Inboundrules = apiInboundrules.query();
				$scope.InboundrulesSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.InboundrulesGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'nat_port_offset', field:'nat_port_offset'/*, visible: */},
						{ name:'app', field:'app'/*, visible: */},
						{ name:'no_reflection', field:'no_reflection'/*, visible: */},
						{ name:'uplinks', field:'uplinks'/*, visible: */},
						{ name:'mode', field:'mode'/*, visible: */},
						{ name:'id', field:'id'/*, visible: */},
						{ name:'inactive', field:'inactive'/*, visible: */},
						{ name:'custom_ip', field:'custom_ip'/*, visible: */},
						{ name:'hostlist', field:'hostlist'/*, visible: */},
						{ name:'use_hostlist', field:'use_hostlist'/*, visible: */},
					],
					data: $scope.Inboundrules,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					apiInboundrules.save(newObject).$promise.then(function(data){
    						$scope.Inboundrules.push(data);
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
                			$scope.InboundrulesSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        			},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.InboundrulesSelected = undefined;
				}
				
				$scope.InboundrulesFields = [
						{key: 'nat_port_offset', type: 'input',
            				templateOptions: {
                				type: 'integer', label: 'nat_port_offset', placeholder: "nat_port_offset", required: false
            				}
          				},
						{key: 'app', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'app', placeholder: "app", required: false
            				}
          				},
						{key: 'no_reflection', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'no_reflection', placeholder: "no_reflection", required: false
            				}
          				},
						{key: 'uplinks', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'uplinks', placeholder: "uplinks", required: false
            				}
          				},
						{key: 'mode', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'mode', placeholder: "mode", required: false
            				}
          				},
						{key: 'id', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'id', placeholder: "id", required: false
            				}
          				},
						{key: 'inactive', type: 'input',
            				templateOptions: {
                				type: 'boolean', label: 'inactive', placeholder: "inactive", required: false
            				}
          				},
						{key: 'custom_ip', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'custom_ip', placeholder: "custom_ip", required: false
            				}
          				},
						{key: 'hostlist', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'hostlist', placeholder: "hostlist", required: false
            				}
          				},
						{key: 'use_hostlist', type: 'input',
            				templateOptions: {
                				type: 'boolean', label: 'use_hostlist', placeholder: "use_hostlist", required: false
            				}
          				},
				];
		}]
)
;