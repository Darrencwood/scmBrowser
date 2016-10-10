'use strict';
angular.module('myApp.orgsEndpoints', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/orgsEndpoints', {
    templateUrl: 'views/orgsEndpoints/orgsEndpoints.html',
    controller: 'orgsEndpointsCtrl'
  });
}])
.controller('orgsEndpointsCtrl',
		[ '$scope', 'orgsEndpointsApi', '$location', 'orgsEndpointsSelectionSvc', '$timeout',
			function($scope, orgsEndpointsApi, $location, orgsEndpointsSelectionSvc, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.orgsEndpoints = orgsEndpointsApi.query();
				$scope.orgsEndpointsSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.orgsEndpointsGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					rowHeight: 40,
					columnDefs: [
						{ name:'Vmac', field:'vmac'/*, visible: */},
						{ name:'Secret', field:'secret'/*, visible: */},
						{ name:'Id', field:'id'/*, visible: */},
						{ name:'Devices', field:'devices'/*, visible: */},
						{ name:'Org', field:'org'/*, visible: */},
						{ name:'User', field:'user'/*, visible: */},
						{ name:'Client', field:'client_id'/*, visible: */},
					],
					data: $scope.orgsEndpoints,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					orgsEndpointsApi.save(newObject).$promise.then(function(data){
    						$scope.orgsEndpoints.push(data);
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
                					$scope.orgsEndpointsSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.orgsEndpointsSelected = undefined;
				}
				
				$scope.orgsEndpointsFields = [
						{key: 'vmac', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'vmac', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'secret', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'secret', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'id', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'devices', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'devices', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'user', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'user', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'client_id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'client_id', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
				];
				console.log();
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
					
					var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent("zvmac,secret,devices,org,user,client_id\n");
					var dlAnchorElem = document.getElementById('download');
					dlAnchorElem.setAttribute("href",     dataStr     );
					dlAnchorElem.setAttribute("download", "org.csv");
							
				$scope.closeResults = function(){
					$scope.showUploadResults = false;
				};
}]);