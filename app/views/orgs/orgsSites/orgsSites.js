'use strict';
angular.module('myApp.orgsSites', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/orgsSites', {
    templateUrl: 'views/orgsSites/orgsSites.html',
    controller: 'orgsSitesCtrl'
  });
}])
.controller('orgsSitesCtrl',
		[ '$scope', 'orgsSitesApi', '$location', 'orgsSitesSelectionSvc', '$timeout',
			function($scope, orgsSitesApi, $location, orgsSitesSelectionSvc, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.orgsSites = orgsSitesApi.query();
				$scope.orgsSitesSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.orgsSitesGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'Id', field:'id'/*, visible: */},
						{ name:'Name', field:'name'/*, visible: */},
						{ name:'Org', field:'org'/*, visible: */},
						{ name:'Longname', field:'longname'/*, visible: */},
						{ name:'Uplinks', field:'uplinks'/*, visible: */},
						{ name:'Networks', field:'networks'/*, visible: */},
						{ name:'Street Address', field:'street_address'/*, visible: */},
						{ name:'City', field:'city'/*, visible: */},
						{ name:'Country', field:'country'/*, visible: */},
						{ name:'Timezone', field:'timezone'/*, visible: */},
						{ name:'Size', field:'size'/*, visible: */},
						{ name:'Uid', field:'uid'/*, visible: */},
					],
					data: $scope.orgsSites,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					orgsSitesApi.save(newObject).$promise.then(function(data){
    						$scope.orgsSites.push(data);
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
                					$scope.orgsSitesSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.orgsSitesSelected = undefined;
				}
				
				$scope.orgsSitesFields = [
						{key: 'id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'id', placeholder: ""/*, required: */
            					}
          				},
						{key: 'name', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'name', placeholder: ""/*, required: */
            					}
          				},
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: ""/*, required: */
            					}
          				},
						{key: 'longname', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'longname', placeholder: ""/*, required: */
            					}
          				},
						{key: 'uplinks', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'uplinks', placeholder: ""/*, required: */
            					}
          				},
						{key: 'networks', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'networks', placeholder: ""/*, required: */
            					}
          				},
						{key: 'street_address', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'street_address', placeholder: ""/*, required: */
            					}
          				},
						{key: 'city', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'city', placeholder: ""/*, required: */
            					}
          				},
						{key: 'country', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'country', placeholder: ""/*, required: */
            					}
          				},
						{key: 'timezone', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'timezone', placeholder: ""/*, required: */
            					}
          				},
						{key: 'size', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'size', placeholder: ""/*, required: */
            					}
          				},
						{key: 'uid', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'uid', placeholder: ""/*, required: */
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
								
				var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent("name,org,longname,uplinks,networks,street_address,city,country,timezone,size\n");
				var dlAnchorElem = document.getElementById('download');
				dlAnchorElem.setAttribute("href",     dataStr     );
				dlAnchorElem.setAttribute("download", "org.csv");
				
				$scope.closeResults = function(){
					$scope.showUploadResults = false;
				};
}]);