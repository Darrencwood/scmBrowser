'use strict';
angular.module('myApp.broadcasts', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/broadcasts', {
    templateUrl: 'views/broadcasts/broadcasts.html',
    controller: 'broadcastsCtrl'
  });
}])
.controller('broadcastsCtrl',
		[ '$scope', 'broadcastsApi', '$location', 'broadcastsSelectionSvc', '$timeout',
			function($scope, broadcastsApi, $location, broadcastsSelectionSvc, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.broadcasts = broadcastsApi.query();
				$scope.broadcastsSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.broadcastsGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'Id', field:'id'/*, visible: */},
						{ name:'Org', field:'org'/*, visible: */},
						{ name:'Site', field:'site'/*, visible: */},
						{ name:'Zone', field:'zone'/*, visible: */},
						{ name:'Ssid', field:'ssid'/*, visible: */},
						{ name:'Inactive', field:'inactive'/*, visible: */},
						{ name:'Dynzone', field:'dynzone'/*, visible: */},
						{ name:'Portal', field:'portal'/*, visible: */},
						{ name:'Hide Ssid', field:'hide_ssid'/*, visible: */},
						{ name:'Band', field:'band'/*, visible: */},
					],
					data: $scope.broadcasts,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					broadcastsApi.save(newObject).$promise.then(function(data){
    						$scope.broadcasts.push(data);
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
                					$scope.broadcastsSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.broadcastsSelected = undefined;
				}
				
				$scope.broadcastsFields = [
						{key: 'id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'id', placeholder: ""/*, required: */
            					}
          				},
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: ""/*, required: */
            					}
          				},
						{key: 'site', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'site', placeholder: ""/*, required: */
            					}
          				},
						{key: 'zone', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'zone', placeholder: ""/*, required: */
            					}
          				},
						{key: 'ssid', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'ssid', placeholder: ""/*, required: */
            					}
          				},
						{key: 'inactive', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'inactive', placeholder: ""/*, required: */
            					}
          				},
						{key: 'dynzone', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'dynzone', placeholder: ""/*, required: */
            					}
          				},
						{key: 'portal', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'portal', placeholder: ""/*, required: */
            					}
          				},
						{key: 'hide_ssid', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'hide_ssid', placeholder: ""/*, required: */
            					}
          				},
						{key: 'band', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'band', placeholder: ""/*, required: */
            					}
          				},
				];
				var uploadZone = document.getElementById('upload');

    			// Optional.   Show the copy icon when dragging over.  Seems to
    			// only work for chrome.
    			uploadZone.addEventListener('dragover', function(e) {
    		    	e.stopPropagation();
    		    	e.preventDefault();
    		    	e.dataTransfer.dropEffect = 'copy';
    			});
		
    			// Get file data on drop
    			uploadZone.addEventListener('drop', function(e) {
    		    	e.stopPropagation();
    		    	e.preventDefault();
    		    	var files = e.dataTransfer.files; // Array of all files
    		    	$scope.updateResults =[];
    		    	$scope.showUploadResults = true;
    		    	$scope.gridApi.importer.importFile(files[0]);
				});
								
				var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent("org,site,zone,ssid,inactive,dynzone,portal,hide_ssid,band\n");
				var dlAnchorElem = document.getElementById('download');
				dlAnchorElem.setAttribute("href",     dataStr     );
				dlAnchorElem.setAttribute("download", "org.csv");
				
				$scope.closeResults = function(){
					$scope.showUploadResults = false;
				};
}]);