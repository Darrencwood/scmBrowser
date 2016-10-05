'use strict';

angular.module('myApp.Ssids', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/ssids', {
    templateUrl: 'views/ssids/ssids.html',
    controller: 'SsidsCtrl'
  });
}])
.controller('SsidsCtrl',
		[ '$scope', 'apiSsids', '$location', 'currentSsids', '$timeout',
			function($scope, apiSsids, $location, currentSsids, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.Ssids = apiSsids.query();
				$scope.SsidsSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.SsidsGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'id', field:'id'/*, visible: */},
						{ name:'org', field:'org'/*, visible: */},
						{ name:'ssid', field:'ssid'/*, visible: */},
						{ name:'security', field:'security'/*, visible: */},
						{ name:'encryption', field:'encryption'/*, visible: */},
						{ name:'key', field:'key'/*, visible: */},
						{ name:'authentication', field:'authentication'/*, visible: */},
						{ name:'eapol_version', field:'eapol_version'/*, visible: */},
						{ name:'dtim_period', field:'dtim_period'/*, visible: */},
						{ name:'bcasts', field:'bcasts'/*, visible: */},
					],
					data: $scope.Ssids,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					apiSsids.save(newObject).$promise.then(function(data){
    						$scope.Ssids.push(data);
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
                			$scope.SsidsSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        			},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.SsidsSelected = undefined;
				}
				
				$scope.SsidsFields = [
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
						{key: 'ssid', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'ssid', placeholder: "The name of the wireless network ", required: false
            				}
          				},
						{key: 'security', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'security', placeholder: "The encryption and authentication method for this SSID. Valid options are &#39;wpa2personal&#39;, &#39;wpa2enterprise&#39;, and &#39;open&#39;. ", required: false
            				}
          				},
						{key: 'encryption', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'encryption', placeholder: "Encryption", required: false
            				}
          				},
						{key: 'key', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'key', placeholder: "The password (WPA-PSK) users need to enter to be able to gain network access with this SSID ", required: false
            				}
          				},
						{key: 'authentication', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'authentication', placeholder: "Authentication", required: false
            				}
          				},
						{key: 'eapol_version', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'eapol_version', placeholder: "EAPOL version", required: false
            				}
          				},
						{key: 'dtim_period', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'dtim_period', placeholder: "DTIM Period", required: false
            				}
          				},
						{key: 'bcasts', type: 'input',
            				templateOptions: {
                				type: 'array', label: 'bcasts', placeholder: "List of bcast objects", required: false
            				}
          				},
				];
		}]
)
;