'use strict';
angular.module('myApp.sites', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/sites', {
  	templateUrl: 'views/sites/sites.html',
    controller: 'sitesCtrl'
  });
}])
.controller('sitesCtrl',
		[ '$scope', 'sitesApi', '$location', 'sitesSelectionSvc', '$timeout', 
			function($scope, sitesApi, $location, sitesSelectionSvc, $timeout  ) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				$scope.sites = sitesApi.query();
				
				$scope.sitesSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.sitesGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					rowHeight: 40,
					columnDefs: [
						{ name:'Id', field:'id'/*, visible: */},
						{ name:'Name', field:'name'/*, visible: */},
						{ name:'Org', field:'org'/*, visible: */},
						{ name:'Longname', field:'longname'/*, visible: */},
						{ name:'Uplinks', field:'uplinks'/*, visible: */},
						{ name:'Networks', field:'networks'/*, visible: */},
						{ name:'Street Address', field:'street_address'/*, visible: */},
						{ name:'City', field:'city'/*, visible: */},
						{ name:'Country', field:'country'/*, visible: */},
						{ name:'Timezone', field:'timezone'/*, visible: */},
						{ name:'Size', field:'size'/*, visible: */},
						{ name:'Uid', field:'uid'/*, visible: */},
					],
					data: $scope.sites,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					sitesApi.save(newObject).$promise.then(function(data){
    						$scope.sites.push(data);
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
                					$scope.sitesSelected = row.entity;
							$scope.showSelectedRecord = true;
							console.log(row.entity);	
							sitesSelectionSvc.setsites(row.entity);
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
					$scope.stopped = $timeout.cancel($scope.clicked);
					console.log(row.entity);	
					sitesSelectionSvc.setsites(row.entity.id);
					$location.path('/org');
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.sitesSelected = undefined;
				}
				
				$scope.sitesFields = [
						{key: 'id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'id', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'name', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'name', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'longname', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'longname', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'uplinks', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'uplinks', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'networks', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'networks', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'street_address', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'street_address', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'city', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'city', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'country', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'country', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'timezone', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'timezone', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'size', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'size', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'uid', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'uid', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
				];
}]);