'use strict';

angular.module('myApp.Wans', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/wans', {
    templateUrl: 'views/wans/wans.html',
    controller: 'WansCtrl'
  });
}])
.controller('WansCtrl',
		[ '$scope', 'apiWans', '$location', 'currentWans', '$timeout',
			function($scope, apiWans, $location, currentWans, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.Wans = apiWans.query();
				$scope.WansSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.WansGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'id', field:'id'/*, visible: */},
						{ name:'org', field:'org'/*, visible: */},
						{ name:'uplinks', field:'uplinks'/*, visible: */},
						{ name:'nets', field:'nets'/*, visible: */},
						{ name:'name', field:'name'/*, visible: */},
						{ name:'longname', field:'longname'/*, visible: */},
						{ name:'uid', field:'uid'/*, visible: */},
						{ name:'internet', field:'internet'/*, visible: */},
						{ name:'sitelink', field:'sitelink'/*, visible: */},
						{ name:'pingcheck_ips', field:'pingcheck_ips'/*, visible: */},
						{ name:'dcuplink', field:'dcuplink'/*, visible: */},
						{ name:'breakout', field:'breakout'/*, visible: */},
						{ name:'breakout_sites', field:'breakout_sites'/*, visible: */},
						{ name:'xfer_networks', field:'xfer_networks'/*, visible: */},
					],
					data: $scope.Wans,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					apiWans.save(newObject).$promise.then(function(data){
    						$scope.Wans.push(data);
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
                			$scope.WansSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        			},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.WansSelected = undefined;
				}
				
				$scope.WansFields = [
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
						{key: 'uplinks', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'uplinks', placeholder: "List of uplink objects", required: false
            				}
          				},
						{key: 'nets', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'nets', placeholder: "List of net objects", required: false
            				}
          				},
						{key: 'name', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'name', placeholder: "Name", required: false
            				}
          				},
						{key: 'longname', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'longname', placeholder: "Long name", required: false
            				}
          				},
						{key: 'uid', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'uid', placeholder: "uid", required: false
            				}
          				},
						{key: 'internet', type: 'input',
            				templateOptions: {
                				type: 'boolean', label: 'internet', placeholder: "Set if this WAN is the internet", required: false
            				}
          				},
						{key: 'sitelink', type: 'input',
            				templateOptions: {
                				type: 'boolean', label: 'sitelink', placeholder: "Set if this WAN is AutoVPN", required: false
            				}
          				},
						{key: 'pingcheck_ips', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'pingcheck_ips', placeholder: "IP(s) to use for uplink status ping checking", required: false
            				}
          				},
						{key: 'dcuplink', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'dcuplink', placeholder: "List of dcuplink objects", required: false
            				}
          				},
						{key: 'breakout', type: 'input',
            				templateOptions: {
                				type: 'boolean', label: 'breakout', placeholder: "Set if this WAN should be used for internet breakout switch", required: false
            				}
          				},
						{key: 'breakout_sites', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'breakout_sites', placeholder: "List of site objects", required: false
            				}
          				},
						{key: 'xfer_networks', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'xfer_networks', placeholder: "Transfer and endpoint networks", required: false
            				}
          				},
				];
		}]
)
;