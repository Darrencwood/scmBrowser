'use strict';

angular.module('myApp.Orgs', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/orgs', {
    templateUrl: 'views/orgs/orgs.html',
    controller: 'OrgsCtrl'
  });
}])
.controller('OrgsCtrl',
		[ '$scope', 'apiOrgs', '$location', 'currentOrgs', '$timeout',
			function($scope, apiOrgs, $location, currentOrgs, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.Orgs = apiOrgs.query();
				$scope.OrgsSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.OrgsGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'id', field:'id'/*, visible: */},
						{ name:'name', field:'name'/*, visible: */},
						{ name:'contact', field:'contact'/*, visible: */},
						{ name:'uid', field:'uid'/*, visible: */},
						{ name:'realm', field:'realm'/*, visible: */},
						{ name:'gid', field:'gid'/*, visible: */},
						{ name:'longname', field:'longname'/*, visible: */},
						{ name:'city', field:'city'/*, visible: */},
						{ name:'country', field:'country'/*, visible: */},
						{ name:'street_address', field:'street_address'/*, visible: */},
						{ name:'timezone', field:'timezone'/*, visible: */},
					],
					data: $scope.Orgs,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					apiOrgs.save(newObject).$promise.then(function(data){
    						$scope.Orgs.push(data);
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
                			$scope.OrgsSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        			},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.OrgsSelected = undefined;
				}
				
				$scope.OrgsFields = [
						{key: 'id', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'id', placeholder: "Unique identifier of this object. This value is generated on object creation. Readonly. ", required: false
            				}
          				},
						{key: 'name', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'name', placeholder: "The name of the organization", required: false
            				}
          				},
						{key: 'contact', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'contact', placeholder: "Freetext field for detailed contact information", required: false
            				}
          				},
						{key: 'uid', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'uid', placeholder: "Unique identifier of this object. This value is generated on object creation. Readonly. ", required: false
            				}
          				},
						{key: 'realm', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'realm', placeholder: "Realm name", required: false
            				}
          				},
						{key: 'gid', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'gid', placeholder: "Organization global id", required: false
            				}
          				},
						{key: 'longname', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'longname', placeholder: "Organization&#39;s long name", required: false
            				}
          				},
						{key: 'city', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'city', placeholder: "City", required: false
            				}
          				},
						{key: 'country', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'country', placeholder: "Country", required: false
            				}
          				},
						{key: 'street_address', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'street_address', placeholder: "Street Address", required: false
            				}
          				},
						{key: 'timezone', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'timezone', placeholder: "Time Zone", required: false
            				}
          				},
				];
		}]
)
;