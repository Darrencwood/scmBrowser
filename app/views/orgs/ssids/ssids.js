'use strict';
angular.module('myApp.ssids', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/ssids', {
    templateUrl: 'views/ssids/ssids.html',
    controller: 'ssidsCtrl'
  });
}])
.controller('ssidsCtrl',
		[ '$scope', 'ssidsApi', '$location', 'ssidsSelectionSvc', '$timeout',
			function($scope, ssidsApi, $location, ssidsSelectionSvc, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.ssids = ssidsApi.query();
				$scope.ssidsSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.ssidsGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'Id', field:'id'/*, visible: */},
						{ name:'Org', field:'org'/*, visible: */},
						{ name:'Ssid', field:'ssid'/*, visible: */},
						{ name:'Security', field:'security'/*, visible: */},
						{ name:'Encryption', field:'encryption'/*, visible: */},
						{ name:'Key', field:'key'/*, visible: */},
						{ name:'Authentication', field:'authentication'/*, visible: */},
						{ name:'Eapol Version', field:'eapol_version'/*, visible: */},
						{ name:'Dtim Period', field:'dtim_period'/*, visible: */},
						{ name:'Bcasts', field:'bcasts'/*, visible: */},
					],
					data: $scope.ssids,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					ssidsApi.save(newObject).$promise.then(function(data){
    						$scope.ssids.push(data);
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
                					$scope.ssidsSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.ssidsSelected = undefined;
				}
				
				$scope.ssidsFields = [
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
						{key: 'ssid', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'ssid', placeholder: ""/*, required: */
            					}
          				},
						{key: 'security', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'security', placeholder: ""/*, required: */
            					}
          				},
						{key: 'encryption', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'encryption', placeholder: ""/*, required: */
            					}
          				},
						{key: 'key', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'key', placeholder: ""/*, required: */
            					}
          				},
						{key: 'authentication', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'authentication', placeholder: ""/*, required: */
            					}
          				},
						{key: 'eapol_version', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'eapol_version', placeholder: ""/*, required: */
            					}
          				},
						{key: 'dtim_period', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'dtim_period', placeholder: ""/*, required: */
            					}
          				},
						{key: 'bcasts', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'bcasts', placeholder: ""/*, required: */
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
								
				var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent("[object Object]\n");
				var dlAnchorElem = document.getElementById('download');
				dlAnchorElem.setAttribute("href",     dataStr     );
				dlAnchorElem.setAttribute("download", "org.csv");
				
				$scope.closeResults = function(){
					$scope.showUploadResults = false;
				}
		}]
)
