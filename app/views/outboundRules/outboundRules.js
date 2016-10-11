'use strict';
angular.module('myApp.outboundRules', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/outbound_rules', {
  	templateUrl: 'views/outbound_rules/outboundRules.html',
    controller: 'outboundRulesCtrl'
  });
}])
.controller('outboundRulesCtrl',
		[ '$scope', 'outboundRulesApi', '$location', 'outboundRulesSelectionSvc', '$timeout', 
			function($scope, outboundRulesApi, $location, outboundRulesSelectionSvc, $timeout  ) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				$scope.outboundRules = outboundRulesApi.query();
				
				$scope.outboundRulesSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.outboundRulesGridOptions = {
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
						{ name:'Users', field:'users'/*, visible: */},
						{ name:'Active', field:'active'/*, visible: */},
						{ name:'Devices', field:'devices'/*, visible: */},
						{ name:'Zones', field:'zones'/*, visible: */},
						{ name:'Apps', field:'apps'/*, visible: */},
						{ name:'Srctype', field:'srctype'/*, visible: */},
						{ name:'Dsttype', field:'dsttype'/*, visible: */},
						{ name:'Tags', field:'tags'/*, visible: */},
						{ name:'Allow', field:'allow'/*, visible: */},
						{ name:'Usergrps', field:'usergrps'/*, visible: */},
						{ name:'Devgrps', field:'devgrps'/*, visible: */},
						{ name:'Appgrps', field:'appgrps'/*, visible: */},
					],
					data: $scope.outboundRules,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					outboundRulesApi.save(newObject).$promise.then(function(data){
    						$scope.outboundRules.push(data);
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
                					$scope.outboundRulesSelected = row.entity;
							$scope.showSelectedRecord = true;
							console.log(row.entity);	
							outboundRulesSelectionSvc.setoutboundRules(row.entity);
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.outboundRulesSelected = undefined;
				}
				
				$scope.outboundRulesFields = [
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
						{key: 'users', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'users', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'active', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'active', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'devices', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'devices', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'zones', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'zones', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'apps', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'apps', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'srctype', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'srctype', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'dsttype', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'dsttype', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'tags', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'tags', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'allow', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'allow', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'usergrps', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'usergrps', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'devgrps', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'devgrps', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'appgrps', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'appgrps', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
				];
}]);