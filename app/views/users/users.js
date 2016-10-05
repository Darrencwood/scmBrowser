'use strict';

angular.module('myApp.Users', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/users', {
    templateUrl: 'views/users/users.html',
    controller: 'UsersCtrl'
  });
}])
.controller('UsersCtrl',
		[ '$scope', 'apiUsers', '$location', 'currentUsers', '$timeout',
			function($scope, apiUsers, $location, currentUsers, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.Users = apiUsers.query();
				$scope.UsersSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.UsersGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'id', field:'id'/*, visible: */},
						{ name:'uid', field:'uid'/*, visible: */},
						{ name:'devices', field:'devices'/*, visible: */},
						{ name:'tags', field:'tags'/*, visible: */},
						{ name:'org', field:'org'/*, visible: */},
						{ name:'usergrps', field:'usergrps'/*, visible: */},
						{ name:'home_site', field:'home_site'/*, visible: */},
						{ name:'name', field:'name'/*, visible: */},
						{ name:'username', field:'username'/*, visible: */},
						{ name:'email', field:'email'/*, visible: */},
						{ name:'mobile', field:'mobile'/*, visible: */},
						{ name:'endpoints', field:'endpoints'/*, visible: */},
					],
					data: $scope.Users,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					apiUsers.save(newObject).$promise.then(function(data){
    						$scope.Users.push(data);
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
                			$scope.UsersSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        			},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.UsersSelected = undefined;
				}
				
				$scope.UsersFields = [
						{key: 'id', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'id', placeholder: "id", required: false
            				}
          				},
						{key: 'uid', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'uid', placeholder: "uid", required: false
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
						{key: 'org', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'org', placeholder: "org", required: false
            				}
          				},
						{key: 'usergrps', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'usergrps', placeholder: "usergrps", required: false
            				}
          				},
						{key: 'home_site', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'home_site', placeholder: "home_site", required: false
            				}
          				},
						{key: 'name', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'name', placeholder: "name", required: false
            				}
          				},
						{key: 'username', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'username', placeholder: "username", required: false
            				}
          				},
						{key: 'email', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'email', placeholder: "email", required: false
            				}
          				},
						{key: 'mobile', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'mobile', placeholder: "Mobile Phone", required: false
            				}
          				},
						{key: 'endpoints', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'endpoints', placeholder: "endpoints", required: false
            				}
          				},
				];
		}]
)
;