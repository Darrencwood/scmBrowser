'use strict';

angular.module('myApp.Zones', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/zones', {
    templateUrl: 'views/zones/zones.html',
    controller: 'ZonesCtrl'
  });
}])
.controller('ZonesCtrl',
		[ '$scope', 'apiZones', '$location', 'currentZones', '$timeout',
			function($scope, apiZones, $location, currentZones, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.Zones = apiZones.query();
				$scope.ZonesSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.ZonesGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'id', field:'id'/*, visible: */},
						{ name:'org', field:'org'/*, visible: */},
						{ name:'name', field:'name'/*, visible: */},
						{ name:'site', field:'site'/*, visible: */},
						{ name:'networks', field:'networks'/*, visible: */},
						{ name:'mgmt', field:'mgmt'/*, visible: */},
						{ name:'icmp', field:'icmp'/*, visible: */},
						{ name:'guest', field:'guest'/*, visible: */},
						{ name:'breakout_preference', field:'breakout_preference'/*, visible: */},
						{ name:'routes', field:'routes'/*, visible: */},
						{ name:'bcasts', field:'bcasts'/*, visible: */},
						{ name:'tag', field:'tag'/*, visible: */},
						{ name:'tags', field:'tags'/*, visible: */},
					],
					data: $scope.Zones,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					apiZones.save(newObject).$promise.then(function(data){
    						$scope.Zones.push(data);
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
                			$scope.ZonesSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        			},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.ZonesSelected = undefined;
				}
				
				$scope.ZonesFields = [
						{key: 'id', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'id', placeholder: "Unique identifier of this object. This value is generated on object creation. Readonly. ", required: false
            				}
          				},
						{key: 'org', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'org', placeholder: "Reference of the org this zone is in", required: false
            				}
          				},
						{key: 'name', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'name', placeholder: "The name of the zone", required: false
            				}
          				},
						{key: 'site', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'site', placeholder: "Reference of the site this zone is in", required: false
            				}
          				},
						{key: 'networks', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'networks', placeholder: "List of network objects", required: false
            				}
          				},
						{key: 'mgmt', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'mgmt', placeholder: "Management Zone", required: false
            				}
          				},
						{key: 'icmp', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'icmp', placeholder: "ICMP traffic (&#39;all&#39;, &#39;ping&#39;, &#39;none&#39;)", required: false
            				}
          				},
						{key: 'guest', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'guest', placeholder: "Guest Zone", required: false
            				}
          				},
						{key: 'breakout_preference', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'breakout_preference', placeholder: "List of wan objects", required: false
            				}
          				},
						{key: 'routes', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'routes', placeholder: "List of route objects", required: false
            				}
          				},
						{key: 'bcasts', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'bcasts', placeholder: "List of bcast objects", required: false
            				}
          				},
						{key: 'tag', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'tag', placeholder: "Each zone has a vlan tag. If empty, this tag will be automatically assigned. Numbers 1-4049 may be used.  Tags over 4050 are reserved for internal use. ", required: false
            				}
          				},
						{key: 'tags', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'tags', placeholder: "Policy tags", required: false
            				}
          				},
				];
		}]
)
;