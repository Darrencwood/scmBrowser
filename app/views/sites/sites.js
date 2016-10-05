'use strict';

angular.module('myApp.Sites', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/sites', {
    templateUrl: 'views/sites/sites.html',
    controller: 'SitesCtrl'
  });
}])
.controller('SitesCtrl',
		[ '$scope', 'apiSites', '$location', 'currentSites', '$timeout',
			function($scope, apiSites, $location, currentSites, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.Sites = apiSites.query();
				$scope.SitesSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.SitesGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'id', field:'id'/*, visible: */},
						{ name:'name', field:'name'/*, visible: */},
						{ name:'org', field:'org'/*, visible: */},
						{ name:'longname', field:'longname'/*, visible: */},
						{ name:'uplinks', field:'uplinks'/*, visible: */},
						{ name:'networks', field:'networks'/*, visible: */},
						{ name:'street_address', field:'street_address'/*, visible: */},
						{ name:'city', field:'city'/*, visible: */},
						{ name:'country', field:'country'/*, visible: */},
						{ name:'timezone', field:'timezone'/*, visible: */},
						{ name:'size', field:'size'/*, visible: */},
						{ name:'uid', field:'uid'/*, visible: */},
					],
					data: $scope.Sites,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					apiSites.save(newObject).$promise.then(function(data){
    						$scope.Sites.push(data);
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
                			$scope.SitesSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        			},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.SitesSelected = undefined;
				}
				
				$scope.SitesFields = [
						{key: 'id', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'id', placeholder: "Unique identifier of this object. This value is automatically generated when this object is created. Readonly. ", required: false
            				}
          				},
						{key: 'name', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'name', placeholder: "Short name or tag of the site ", required: false
            				}
          				},
						{key: 'org', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'org', placeholder: "Organization", required: false
            				}
          				},
						{key: 'longname', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'longname', placeholder: "Long name", required: false
            				}
          				},
						{key: 'uplinks', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'uplinks', placeholder: "List of uplink objects", required: false
            				}
          				},
						{key: 'networks', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'networks', placeholder: "List of network objects", required: false
            				}
          				},
						{key: 'street_address', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'street_address', placeholder: "Street address", required: false
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
						{key: 'timezone', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'timezone', placeholder: "Time zone", required: false
            				}
          				},
						{key: 'size', type: 'input',
            				templateOptions: {
                				type: 'integer', label: 'size', placeholder: "Size", required: false
            				}
          				},
						{key: 'uid', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'uid', placeholder: "Unique integer identifier of this object. This value is automatically generated when this object is created. Readonly. ", required: false
            				}
          				},
				];
		}]
)
;