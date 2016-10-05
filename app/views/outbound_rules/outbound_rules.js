'use strict';

angular.module('myApp.Outboundrules', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/outbound_rules', {
    templateUrl: 'views/outbound_rules/outbound_rules.html',
    controller: 'OutboundrulesCtrl'
  });
}])
.controller('OutboundrulesCtrl',
		[ '$scope', 'apiOutboundrules', '$location', 'currentOutboundrules', '$timeout',
			function($scope, apiOutboundrules, $location, currentOutboundrules, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.Outboundrules = apiOutboundrules.query();
				$scope.OutboundrulesSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.OutboundrulesGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'id', field:'id'/*, visible: */},
						{ name:'org', field:'org'/*, visible: */},
						{ name:'users', field:'users'/*, visible: */},
						{ name:'active', field:'active'/*, visible: */},
						{ name:'devices', field:'devices'/*, visible: */},
						{ name:'zones', field:'zones'/*, visible: */},
						{ name:'apps', field:'apps'/*, visible: */},
						{ name:'srctype', field:'srctype'/*, visible: */},
						{ name:'dsttype', field:'dsttype'/*, visible: */},
						{ name:'tags', field:'tags'/*, visible: */},
						{ name:'allow', field:'allow'/*, visible: */},
						{ name:'usergrps', field:'usergrps'/*, visible: */},
						{ name:'devgrps', field:'devgrps'/*, visible: */},
						{ name:'appgrps', field:'appgrps'/*, visible: */},
					],
					data: $scope.Outboundrules,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					apiOutboundrules.save(newObject).$promise.then(function(data){
    						$scope.Outboundrules.push(data);
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
                			$scope.OutboundrulesSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        			},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.OutboundrulesSelected = undefined;
				}
				
				$scope.OutboundrulesFields = [
						{key: 'id', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'id', placeholder: "id", required: false
            				}
          				},
						{key: 'org', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'org', placeholder: "org", required: false
            				}
          				},
						{key: 'users', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'users', placeholder: "users", required: false
            				}
          				},
						{key: 'active', type: 'input',
            				templateOptions: {
                				type: 'boolean', label: 'active', placeholder: "active", required: false
            				}
          				},
						{key: 'devices', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'devices', placeholder: "devices", required: false
            				}
          				},
						{key: 'zones', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'zones', placeholder: "zones", required: false
            				}
          				},
						{key: 'apps', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'apps', placeholder: "apps", required: false
            				}
          				},
						{key: 'srctype', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'srctype', placeholder: "srctype", required: false
            				}
          				},
						{key: 'dsttype', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'dsttype', placeholder: "dsttype", required: false
            				}
          				},
						{key: 'tags', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'tags', placeholder: "tags", required: false
            				}
          				},
						{key: 'allow', type: 'input',
            				templateOptions: {
                				type: 'boolean', label: 'allow', placeholder: "allow", required: false
            				}
          				},
						{key: 'usergrps', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'usergrps', placeholder: "usergrps", required: false
            				}
          				},
						{key: 'devgrps', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'devgrps', placeholder: "devgrps", required: false
            				}
          				},
						{key: 'appgrps', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'appgrps', placeholder: "appgrps", required: false
            				}
          				},
				];
		}]
)
;