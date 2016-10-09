'use strict';
angular.module('myApp.orgsAp', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/orgsAp', {
    templateUrl: 'views/orgsAp/orgsAp.html',
    controller: 'orgsApCtrl'
  });
}])
.controller('orgsApCtrl',
		[ '$scope', 'orgsApApi', '$location', 'orgsApSelectionSvc', '$timeout',
			function($scope, orgsApApi, $location, orgsApSelectionSvc, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.orgsAp = orgsApApi.query();
				$scope.orgsApSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.orgsApGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'Site', field:'site'/*, visible: */},
						{ name:'Org', field:'org'/*, visible: */},
						{ name:'Local As', field:'local_as'/*, visible: */},
						{ name:'Router', field:'router_id'/*, visible: */},
						{ name:'Serial', field:'serial'/*, visible: */},
						{ name:'Id', field:'id'/*, visible: */},
						{ name:'Uid', field:'uid'/*, visible: */},
						{ name:'Zones', field:'zones'/*, visible: */},
						{ name:'Radios', field:'radios'/*, visible: */},
						{ name:'Realm', field:'realm'/*, visible: */},
						{ name:'Location', field:'location'/*, visible: */},
						{ name:'Ports', field:'ports'/*, visible: */},
						{ name:'Uplinks', field:'uplinks'/*, visible: */},
						{ name:'Inventory Version Cc', field:'inventory_version_cc'/*, visible: */},
						{ name:'Disable Stp', field:'disable_stp'/*, visible: */},
						{ name:'License', field:'license'/*, visible: */},
						{ name:'Model', field:'model'/*, visible: */},
						{ name:'Sitelink', field:'sitelink'/*, visible: */},
						{ name:'Simulated', field:'simulated'/*, visible: */},
					],
					data: $scope.orgsAp,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					orgsApApi.save(newObject).$promise.then(function(data){
    						$scope.orgsAp.push(data);
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
                					$scope.orgsApSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.orgsApSelected = undefined;
				}
				
				$scope.orgsApFields = [
						{key: 'site', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'site', placeholder: ""/*, required: */
            					}
          				},
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: ""/*, required: */
            					}
          				},
						{key: 'local_as', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'local_as', placeholder: ""/*, required: */
            					}
          				},
						{key: 'router_id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'router_id', placeholder: ""/*, required: */
            					}
          				},
						{key: 'serial', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'serial', placeholder: ""/*, required: */
            					}
          				},
						{key: 'id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'id', placeholder: ""/*, required: */
            					}
          				},
						{key: 'uid', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'uid', placeholder: ""/*, required: */
            					}
          				},
						{key: 'zones', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'zones', placeholder: ""/*, required: */
            					}
          				},
						{key: 'radios', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'radios', placeholder: ""/*, required: */
            					}
          				},
						{key: 'realm', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'realm', placeholder: ""/*, required: */
            					}
          				},
						{key: 'location', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'location', placeholder: ""/*, required: */
            					}
          				},
						{key: 'ports', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'ports', placeholder: ""/*, required: */
            					}
          				},
						{key: 'uplinks', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'uplinks', placeholder: ""/*, required: */
            					}
          				},
						{key: 'inventory_version_cc', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'inventory_version_cc', placeholder: ""/*, required: */
            					}
          				},
						{key: 'disable_stp', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'disable_stp', placeholder: ""/*, required: */
            					}
          				},
						{key: 'license', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'license', placeholder: ""/*, required: */
            					}
          				},
						{key: 'model', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'model', placeholder: ""/*, required: */
            					}
          				},
						{key: 'sitelink', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'sitelink', placeholder: ""/*, required: */
            					}
          				},
						{key: 'simulated', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'simulated', placeholder: ""/*, required: */
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
								
				var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent("site,org,local_as,router_id,serial,zones,radios,realm,location,ports,uplinks,inventory_version_cc,disable_stp,license,model,sitelink\n");
				var dlAnchorElem = document.getElementById('download');
				dlAnchorElem.setAttribute("href",     dataStr     );
				dlAnchorElem.setAttribute("download", "org.csv");
				
				$scope.closeResults = function(){
					$scope.showUploadResults = false;
				};
}]);